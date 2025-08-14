import * as signalR from "@microsoft/signalr";
import React, { useEffect, useRef, useState } from "react";
// import { RTCIceCandidateInit, RTCSessionDescriptionInit } from "w3c-web-rtc";
const peerConnections: Record<string, RTCPeerConnection> = {}; // connectionId -> RTCPeerConnection

interface IParticipant {
  connectionId: string;
  userName: string;
  stream?: MediaStream; // optional
}

interface ISignalData {
  to: string;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
}

export function useSignalR(
  meetingId: string,
  userName: string,
  localStreamRef: React.MutableRefObject<MediaStream | null>,
) {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  async function startConnection() {
    console.log("SignalR state:", connectionRef.current?.state);
    try {
      await connectionRef.current?.start();
      console.log("@@@SignalR Connected");
      await connectionRef.current?.invoke("JoinRoom", meetingId, userName);
    } catch (err) {
      console.error("SignalR connection failed: ", err);
      setTimeout(startConnection, 5000);
    }
  }

  console.log("@@@participants", participants, peerConnections);

  // create a new RTCPeerConnection for a new participant
  // remoteConnectionId: the signalR connectionId of the remote participant
  function createPeerConnection(
    remoteConnectionId: string,
    isInitiator: boolean,
  ) {
    const localStream = localStreamRef.current;
    const iceServersConfig = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const pc = new RTCPeerConnection(iceServersConfig);

    localStream?.getTracks().forEach((track) => {
      console.log("Adding track:", track);
      pc.addTrack(track, localStream);
    });
    // 监听 ICE candidate，发送给对方
    pc.onicecandidate = (event) => {
      console.log("ICE candidate:", event.candidate);
      if (event.candidate) {
        connectionRef.current?.invoke(
          "SendSignal",
          meetingId,
          "candidate",
          JSON.stringify({
            to: remoteConnectionId,
            candidate: event.candidate,
          }),
        );
      }
    };

    // 监听远端媒体流事件
    pc.ontrack = (event) => {
      console.log(`Received remote stream from ${remoteConnectionId}`);
      updateRemoteStream(remoteConnectionId, event.streams[0]);
    };
    // 监听ICE状态变化
    pc.oniceconnectionstatechange = () => {
      console.log("ICE state:", pc.iceConnectionState);
    };
    peerConnections[remoteConnectionId] = pc;

    // if initiator, create offer
    if (isInitiator) {
      console.log("Creating offer for", remoteConnectionId);
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          console.log("Sending offer to", remoteConnectionId);
          connectionRef.current?.invoke(
            "SendSignal",
            meetingId,
            "offer",
            JSON.stringify({
              to: remoteConnectionId,
              sdp: pc.localDescription,
            }),
          );
        })
        .catch((err) => {
          console.error("Failed to create/send offer:", err);
        });
    }

    return pc;
  }

  // update remote stream in participants state
  function updateRemoteStream(connectionId: string, stream: MediaStream) {
    setParticipants((prev) => {
      const existing = prev.find((p) => p.connectionId === connectionId);
      if (existing) {
        return prev.map((p) =>
          p.connectionId === connectionId ? { ...p, stream } : p,
        );
      } else {
        return [...prev, { connectionId, userName: "", stream }];
      }
    });
  }

  useEffect(() => {
    if (!meetingId || !userName) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}meeting`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    const myConnectionId = connection.connectionId;

    // receive signals from server
    connection.on(
      "ReceiveSignal",
      async (signal: { type: string; data: string; senderId: string }) => {
        const { type, data, senderId } = signal;
        const parsedData = JSON.parse(data) as ISignalData;
        console.log("Received signal:", type, parsedData, senderId);
        if (parsedData.to !== connection.connectionId) {
          console.log(
            "Signal data missing 'to' field:",
            senderId,
            type,
            parsedData,
          );
          return;
        }
        // 如果没有对应的 PeerConnection，先创建（isInitiator=false）
        let pc = peerConnections[senderId];
        if (!pc) {
          pc = createPeerConnection(senderId, false);
        }

        try {
          if (type === "offer" && parsedData.sdp) {
            await pc.setRemoteDescription(
              new RTCSessionDescription(parsedData.sdp),
            );
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            await connection.invoke(
              "SendSignal",
              meetingId,
              "answer",
              JSON.stringify({
                to: senderId,
                sdp: pc.localDescription,
              }),
            );
          } else if (type === "answer" && parsedData.sdp) {
            await pc.setRemoteDescription(
              new RTCSessionDescription(parsedData.sdp),
            );
          } else if (type === "candidate") {
            if (parsedData.candidate) {
              await pc.addIceCandidate(
                new RTCIceCandidate(parsedData.candidate),
              );
            }
          }
        } catch (error) {
          console.error("Error handling signal:", error);
        }
      },
    );

    // participants updated
    connection.on("ParticipantsUpdated", (participants: IParticipant[]) => {
      console.log("Participants updated:", participants);
      // 更新参会者，但不修改已有的流
      setParticipants((pre) => {
        return [
          ...pre.filter((p) =>
            participants.map((i) => i.connectionId).includes(p.connectionId),
          ),
          ...participants.filter(
            (p) => !pre.map((i) => i.connectionId).includes(p.connectionId),
          ),
        ];
      });
    });
    // as a old participant, create peer connections for new participants
    connection.on("NewParticipant", (newParticipant: IParticipant) => {
      console.log(
        `Establishing connection to ${newParticipant.userName} (${newParticipant.connectionId})`,
      );
      createPeerConnection(newParticipant.connectionId, true);
    });

    connectionRef.current = connection;

    // unload handler to leave room
    function handleBeforeUnload() {
      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        connectionRef.current.invoke("LeaveRoom", meetingId);
        connectionRef.current.stop();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [meetingId, userName]);

  return {
    sendSignal: async (type, data) => {
      if (
        connectionRef.current?.state === signalR.HubConnectionState.Connected
      ) {
        await connectionRef.current.invoke("SendSignal", meetingId, type, data);
      }
    },
    startConnection,
    participants,
    connectionRef,
  };
}
