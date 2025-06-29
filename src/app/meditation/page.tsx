"use client";
import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { ChevronLeft, ChevronRight, Waves, VolumeX } from "lucide-react";
import Banner from "@/components/Banner";
import { useRouter } from "next/navigation";
export default function MeditationSettings() {
  const router = useRouter();
  return (
    <BackgroundWrapper>
    <main
  >
      {/* バナー */}
      <Banner text="めいそうしますか？" />

      <div
        // カード
        className="fixed inset-x-0 bottom-20 -translate-y-1/2 bg-white rounded-4xl shadow-xl p-6 w-full max-w-sm mx-auto">
        <div className="flex justify-center gap-x-10 text-center">
          {/* 時間 */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-2">時間</span>
            <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
              10分
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
              <span>10分</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* 環境音 */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-2">環境音</span>
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Waves className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
              <span>なみ</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* アシスト */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-2">アシスト</span>
            <div className="w-20 h-20 rounded-full bg-gray-300 text-black flex items-center justify-center">
              <VolumeX className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
              <span>なし</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

				{/* アクションボタン */}
        <div className="flex gap-4 mt-6">
					<button onClick={() => router.push("/")} className="flex-1 py-2 bg-green-600 text-white rounded-full shadow">
            やめる
          </button>
          <button onClick={() => router.push("/meditation/timer")} className="flex-1 py-2 bg-gray-300 text-black rounded-full shadow">
            開始
          </button>
        </div>
      </div>

      <HomeButton />
      </main>
      </BackgroundWrapper>
  );
}