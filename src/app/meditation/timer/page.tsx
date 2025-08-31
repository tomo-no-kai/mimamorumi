"use client";

import BackgroundWrapper from "@/components/BackgroundWrapper";
import Banner from "@/components/Banner";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

interface MeditationRecord {
  minutes: number;
  date: string;
}

export default function MeditationTimerPage() {
  return <MeditationTimer />;
}

function MeditationTimer() {
  const router = useRouter();
  const searchParams = useSearchParams(); // クライアント側で安全

  // searchParamsがnullの場合はデフォルト値
  const sound = searchParams?.get("sound") || "なし";
  const minutes = parseInt(searchParams?.get("minutes") || "10", 10);

  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const endSoundRef = useRef<HTMLAudioElement | null>(null);

  // 環境音再生
  useEffect(() => {
    if (sound === "なし") return;
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.play().catch(() => console.log("自動再生ブロックされた"));
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [sound]);

  const saveMeditationRecord = useCallback(() => {
    const newRecord: MeditationRecord = {
      minutes,
      date: new Date().toISOString(),
    };
    const stored = localStorage.getItem("meditationRecords");
    const records: MeditationRecord[] = stored ? JSON.parse(stored) : [];
    records.push(newRecord);
    localStorage.setItem("meditationRecords", JSON.stringify(records));
  }, [minutes]);

  // カウントダウン
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          endSoundRef.current?.play().catch(() => console.log("終了音の再生がブロックされた"));
          audioRef.current?.pause();

          saveMeditationRecord();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isPaused, saveMeditationRecord]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <BackgroundWrapper>
      <main>
        <Banner text={timeLeft === 0 ? "お疲れ様でした" : "めいそう中..."} />

        {sound === "なみ" && <audio ref={audioRef} src="/sounds/wave.mp3" />}

        <audio ref={endSoundRef} src="/sounds/end.mp3" preload="auto" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-x-0 bottom-48 bg-white rounded-4xl shadow-xl px-6 py-4 w-full max-w-xs mx-auto text-center"
        >
          <p className="text-sm text-gray-500 mb-1">のこり時間</p>
          <div className="text-4xl font-sans font-bold text-gray-800 mb-4">{formatTime(timeLeft)}</div>

          <div className="flex gap-4">
            {timeLeft === 0 ? (
              <button
                onClick={() => router.push("/")}
                className="flex-1 py-2 bg-green-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    saveMeditationRecord();
                    router.push("/");
                  }}
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
              </>
            )}
          </div>
        </motion.div>
      </main>
    </BackgroundWrapper>
  );
}