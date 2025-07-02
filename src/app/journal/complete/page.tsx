"use client";
import { useEffect } from "react";
import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Banner from "@/components/Banner";
import { useRouter } from "next/navigation";
import Bubble from "@/components/Bubble";

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