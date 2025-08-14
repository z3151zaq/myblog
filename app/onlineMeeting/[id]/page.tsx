"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { useSignalR } from "./useSignalR";

const RoomPage = () => {
  const params = useParams();
  const meetingId = typeof params === "object" ? (params.id as string) : "";
  const [showModal, setShowModal] = useState(true);
  // const [mediaAllowed, setMediaAllowed] = useState(false);
  // const [mainStream, setMainStream] = useState<MediaStream | null>(null);
  const [mainUser, setMainUser] = useState<string>("local");
  const localStreams = useRef<MediaStream>();
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(true);
  const [enableAudio, setEnableAudio] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { startConnection, participants, connectionRef } = useSignalR(
    meetingId,
    userName,
    localStreams,
  );
  const currentConnectionId = connectionRef.current?.connectionId;
  console.log("@@@currentConnectionId", currentConnectionId);
  useEffect(() => {
    setMainUser(currentConnectionId ?? "");
  }, [currentConnectionId]);
  // 获取本地媒体流
  const getLocalMedia = async () => {
    try {
      localStreams.current = await navigator.mediaDevices.getUserMedia({
        video: enableVideo,
        audio: enableAudio,
      });
      const stream = localStreams.current;
      console.log("Local stream:", stream, mainVideoRef.current);
      if (mainVideoRef.current) {
        mainVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Failed to get media: " + (err as any).message);
    }
  };
  // console.log("@@@mainUser", mainUser);
  // useEffect(() => {
  //   if (mediaAllowed) {
  //     getLocalMedia();
  //   }
  // }, [mediaAllowed]);

  useEffect(() => {
    const stream = participants.find(
      (p) => p.connectionId === mainUser,
    )?.stream;
    console.log(
      "@@@mainUser切换",
      mainUser,
      stream,
      mainVideoRef.current && stream,
    );
    if (
      mainUser === currentConnectionId &&
      localStreams.current &&
      mainVideoRef.current
    ) {
      mainVideoRef.current.srcObject = localStreams.current;
      return;
    }
    if (mainVideoRef.current && stream) {
      mainVideoRef.current.srcObject = stream;
    }
  }, [mainUser, participants]);

  // 离开会议
  const handleLeave = async () => {
    if (connectionRef.current) {
      await connectionRef.current.invoke("LeaveRoom", meetingId);
      await connectionRef.current.stop();
    }
    router.push("/onlineMeeting");
  };

  return (
    <div className="flex h-[80vh] gap-4 p-4">
      {/* 离开会议按钮 */}
      <div className="absolute bottom-4 right-8 z-10">
        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={handleLeave}
        >
          Leave Meeting
        </Button>
      </div>
      {/* main vedio */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg relative">
        {/* {mainUser === currentConnectionId ? (
          <video
            ref={mainVideoRef}
            autoPlay
            playsInline
            muted={mainUser === currentConnectionId}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-lg font-bold mb-2">
              {mainUser === currentConnectionId
                ? "No Video"
                : `Remote: ${mainUser}`}
            </div>
            <div className="bg-gray-300 w-40 h-40 rounded-full flex items-center justify-center">
              Video
            </div>
          </div>
        )} */}
        <video
          ref={mainVideoRef}
          autoPlay
          playsInline
          muted={mainUser === currentConnectionId}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* participants list */}
      <div className="w-64 flex flex-col gap-4">
        {participants.map((user) => (
          <Card
            key={user.connectionId}
            className={`cursor-pointer p-1 ${mainUser === user.connectionId ? "border-blue-500 border-2" : ""}`}
            onClick={() => setMainUser(user.connectionId)}
          >
            <div className="font-semibold flex items-center gap-2">
              {user.userName}
              {user.connectionId === currentConnectionId && (
                <span title="You" className="text-yellow-500">
                  ★
                </span>
              )}
            </div>
            <div className="bg-gray-200 w-full h-24 rounded flex items-center justify-center px-2">
              {user.stream || user.connectionId === currentConnectionId ? (
                <video
                  autoPlay
                  playsInline
                  muted={user.connectionId === currentConnectionId}
                  ref={(el) => {
                    if (
                      el &&
                      user.connectionId === currentConnectionId &&
                      localStreams.current
                    ) {
                      el.srcObject = localStreams.current;
                      return;
                    }
                    if (el && user.stream) {
                      // console.log(
                      //   "开始设置",
                      //   el,
                      //   user.stream,
                      //   user.stream.getTracks(),
                      //   user.stream.getVideoTracks(),
                      // );
                      el.srcObject = user.stream;
                    }
                  }}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span>No Video</span>
              )}
            </div>
          </Card>
        ))}
      </div>
      {/* first toast */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg min-w-[320px] flex flex-col items-center">
            <div className="text-lg font-bold mb-4">Join Meeting</div>
            <div className="mb-4 w-full">
              <Input
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-6 text-gray-600">
              To join the meeting, please choose which devices to enable.
            </div>
            <div className="flex flex-col gap-4 mb-6 w-full">
              <div className="flex items-center justify-between w-full">
                <span>Video</span>
                <Switch
                  checked={enableVideo}
                  onCheckedChange={setEnableVideo}
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <span>Audio</span>
                <Switch
                  checked={enableAudio}
                  onCheckedChange={setEnableAudio}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={async () => {
                  if (!userName.trim()) {
                    alert("Please enter your name");
                    return;
                  }
                  // setMediaAllowed(true);
                  await getLocalMedia();
                  startConnection();
                  setShowModal(false);
                }}
              >
                Join
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // setMediaAllowed(false);
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
