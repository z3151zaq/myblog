"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const IndexPage = () => {
  const [meetingId, setMeetingId] = useState("");
  const router = useRouter();

  const handleStartMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 8);
    router.push(`/onlineMeeting/${newMeetingId}`);
  };

  const handleJoinMeeting = () => {
    if (!meetingId.trim()) {
      window.alert("Please enter a meeting ID");
      return;
    }
    router.push(`/onlineMeeting/${meetingId.trim()}`);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[400px] p-6">
        <div className="text-xl font-bold mb-6 text-center">
          WebRTC Group Video Meeting
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleStartMeeting}>
            Start New Meeting
          </Button>
          <Separator className="my-2" />
          <Input
            placeholder="Enter meeting ID to join"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleJoinMeeting();
            }}
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={handleJoinMeeting}
          >
            Join Meeting
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IndexPage;
