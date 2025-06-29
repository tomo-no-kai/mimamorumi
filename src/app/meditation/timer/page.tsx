"use client";

import BackgroundWrapper from "@/components/BackgroundWrapper";
import Banner from "@/components/Banner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function MeditationSettings() {
  const router = useRouter();

  // 初期タイマー：10分（600秒）
  const [timeLeft, setTimeLeft] = useState(600);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // カウントダウン処理
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // クリーンアップ
    return () => clearInterval(intervalRef.current!);
  }, [isPaused]);

  // 秒→mm:ss表示
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <BackgroundWrapper>
    <main>
      <Banner text="めいそう中..." />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-x-0 bottom-48 bg-white rounded-4xl shadow-xl px-6 py-4 w-full max-w-xs mx-auto text-center"
      >
        <p className="text-sm text-gray-500 mb-1">のこり時間</p>

        <div className="text-4xl font-sans font-bold text-gray-800 mb-4">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-colors"
          >
            やめる
          </button>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="flex-1 py-2 bg-orange-400 text-white rounded-full shadow hover:bg-orange-500 transition-colors"
          >
            {isPaused ? "再開" : "一時停止"}
          </button>
        </div>
      </motion.div>

      </main>
      </BackgroundWrapper>
  );
}