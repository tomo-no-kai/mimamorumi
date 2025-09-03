"use client";

import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import Bubble from "@/components/Bubble";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import BounceImage from "@/components/BounceImage";

export default function Page() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");

  const handleClick = () => {
    setBubbleText("こんにちは、調子はどう？");
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

  return (
    <BackgroundWrapper>
      <main className="relative w-full h-screen flex flex-col items-center">
        <div className="flex-1 flex items-end justify-center pb-80">
          <BounceImage
            src="/nui.png"
            alt="タップできる画像"
            size="h-[30vh] w-auto"
            onClick={handleClick}
          />
        </div>

        {/* 吹き出し */}
        <Bubble text={bubbleText} show={showBubble} />

        {/* フッター */}
        <HomeButton />
      </main>
    </BackgroundWrapper>
  );
}