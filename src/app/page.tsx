"use client";

import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import Bubble from "@/components/Bubble";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function Page() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");

  const handleClick = () => {
    setBubbleText("こんにちは、いい天気だね");
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

  return (
    <BackgroundWrapper>
      <main className="relative w-full h-screen flex items-center justify-center">
        {/* 画像だけにクリックをつける */}
        <img
          src="/stamps/stamp1.svg"
          alt="タップできる画像"
          className="w-40 h-40 cursor-pointer opacity-0"
          onClick={handleClick}
        />

        {/* 吹き出し */}
        <Bubble text={bubbleText} show={showBubble} />

        {/* フッター */}
        <HomeButton />
      </main>
    </BackgroundWrapper>
  );
}