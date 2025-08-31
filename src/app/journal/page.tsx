"use client";

import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Banner from "@/components/Banner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function MeditationSettings() {
  const [memo, setMemo] = useState("");
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const router = useRouter();

  const saveJournalRecord = () => {
    const dateStr = format(new Date(), "yyyy-MM-dd");

    // ジャーナルデータのみ扱う
    const stored = localStorage.getItem("journalRecords");
    let records: Record<string, { feeling?: string; image?: string }> = {};

    try {
      records = stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("JSON parse error:", e);
      records = {};
    }

    // 日付ごとのオブジェクトを保持
    records[dateStr] = {
      ...records[dateStr], // 既存データを保持
      feeling: memo,
      image: selectedStamp
    };

    console.log("保存するジャーナルデータ:", records);
    localStorage.setItem("journalRecords", JSON.stringify(records));

    router.push("/journal/complete");
  };

  return (
    <BackgroundWrapper>
      <main>
        <Banner text="今の気持ちは？" />

        <div className="fixed inset-x-0 bottom-48 bg-white rounded-4xl shadow-md p-6 w-full max-w-sm mx-auto text-left">
          <p className="text-sm text-gray-600 mb-2">メモ</p>
          <textarea
            className="w-full h-24 bg-gray-100 rounded-md p-2 text-sm text-gray-800 resize-none outline-none mb-4"
            placeholder="気持ちを書いてみよう"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <p className="text-sm text-gray-600 mb-2">スタンプ</p>
          <div className="flex items-center gap-6 mb-6">
            {[
              { src: "/stamps/stamp1.svg", key: "stamp1", size: "w-10 h-10" },
              { src: "/stamps/stamp2.svg", key: "stamp2", size: "w-10 h-10" },
              { src: "/stamps/stamp3.svg", key: "stamp3", size: "w-10 h-10" },
              { src: "/stamps/stamp4.svg", key: "stamp4", size: "w-11 h-11" },
              { src: "/stamps/stamp5.svg", key: "stamp5", size: "w-12 h-12" },
            ].map(({ src, key, size }) => (
              <div
                key={key}
                onClick={() => setSelectedStamp(key)}
                className={`p-1 cursor-pointer transition-shadow ${
                  selectedStamp === key ? "rounded-full drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" : ""
                }`}
              >
                <img src={src} alt={key} className={`${size}`} />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
            >
              やめる
            </button>
            <button
              onClick={saveJournalRecord}
              className="flex-1 py-2 bg-gray-300 text-black rounded-full shadow hover:bg-gray-400"
            >
              記録
            </button>
          </div>
        </div>

        <HomeButton />
      </main>
    </BackgroundWrapper>
  );
}