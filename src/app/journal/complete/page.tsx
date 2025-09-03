"use client";
import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import BounceImage from "@/components/BounceImage";
import Banner from "@/components/Banner";
import Bubble from "@/components/Bubble";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MeditationSettings() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // 10000ミリ秒 = 10秒

    return () => clearTimeout(timer); // クリーンアップ
  }, [router]);

  return (
    <BackgroundWrapper>
      <div className="relative w-full h-screen flex flex-col">
        <div className="flex-1 flex items-end justify-center pb-80">
          <BounceImage
            src="/nui.png"
            alt="ぬいぐるみ"
            size="h-[30vh] w-auto"
          />
        </div>
      </div>

      <main>
        {/* バナー */}
        <Banner text="記録しました" />

        {/* 吹き出し */}
        <Bubble text="良い調子だね！" show={true} />

        {/* フッター */}
        <HomeButton />
      </main>
    </BackgroundWrapper>
  );
}