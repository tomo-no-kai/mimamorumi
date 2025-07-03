"use client";

import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Banner from "@/components/Banner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MeditationSettings() {
  const [memo, setMemo] = useState("");
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const router = useRouter();

  return (
    <BackgroundWrapper>
    <main>
      {/* バナーの出し分け */}
      <Banner text={"今の気持ちは？"} />

      {/* カード */}
      <div className="fixed inset-x-0 bottom-48 bg-white rounded-4xl shadow-md p-6 w-full max-w-sm mx-auto text-left">
        {/* メモラベル */}
        <p className="text-sm text-gray-600 mb-2">メモ</p>
        <textarea
          className="w-full h-24 bg-gray-100 rounded-md p-2 text-sm text-gray-800 resize-none outline-none mb-4"
          placeholder="気持ちを書いてみよう"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

{/* スタンプラベル */}
<p className="text-sm text-gray-600 mb-2">スタンプ</p>
<div className="flex items-center gap-6 mb-6">
  {[
    { src: "/stamps/stamp1.svg", alt: "青", key: "stamp1", size: "w-10 h-10" },
    { src: "/stamps/stamp2.svg", alt: "グレー", key: "stamp2", size: "w-10 h-10" },
    { src: "/stamps/stamp3.svg", alt: "黄色", key: "stamp3", size: "w-10 h-10" },
    { src: "/stamps/stamp4.svg", alt: "緑", key: "stamp4", size: "w-11 h-11" },
    { src: "/stamps/stamp5.svg", alt: "赤", key: "stamp5", size: "w-12 h-12" },
  ].map(({ src, alt, key, size }) => (
    <div
      key={key}
      onClick={() => setSelectedStamp(key)}
      className={`p-1 cursor-pointer transition-shadow ${
        selectedStamp === key ? "shadow-xl rounded-full" : ""
      }`}
    >
      <img src={src} alt={alt} className={`${size}`} />
    </div>
  ))}
</div>

        {/* ボタン */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
          >
            やめる
          </button>
          <button
            onClick={() => router.push("/journal/complete")}
            className="flex-1 py-2 bg-gray-300 text-black rounded-full shadow hover:bg-gray-400"
          >
            記録
          </button>
        </div>
      </div>

      {/* フッター */}
      <HomeButton />
    </main>
    </BackgroundWrapper>
  );
}