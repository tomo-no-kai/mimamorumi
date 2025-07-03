"use client";
import HomeButton from "@/components/HomeButton";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { ChevronLeft, ChevronRight, Waves, VolumeX, Volume2, Wind } from "lucide-react";
import Banner from "@/components/Banner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MeditationSettings() {
  const router = useRouter();

  // 時間トグル
  const [time, setTime] = useState(10);
  const increaseTime = () => setTime(time + 5);
  const decreaseTime = () => setTime(time > 5 ? time - 5 : time);

  // 環境音トグル
  const sounds = [
    { name: "なみ", icon: Waves },
    { name: "かぜ", icon: Wind },
    { name: "なし", icon: VolumeX },
  ];
  const [soundIndex, setSoundIndex] = useState(0);
  const prevSound = () => setSoundIndex((soundIndex - 1 + sounds.length) % sounds.length);
  const nextSound = () => setSoundIndex((soundIndex + 1) % sounds.length);
  const CurrentSoundIcon = sounds[soundIndex].icon;

  // アシストトグル
  const assists = [
    { name: "なし", icon: VolumeX },
    { name: "あり", icon: Volume2 },
  ];
  const [assistIndex, setAssistIndex] = useState(0);
  const prevAssist = () => setAssistIndex((assistIndex - 1 + assists.length) % assists.length);
  const nextAssist = () => setAssistIndex((assistIndex + 1) % assists.length);
  const CurrentAssistIcon = assists[assistIndex].icon;

  return (
    <BackgroundWrapper>
      <main>
        {/* バナー */}
        <Banner text="めいそうしますか？" />

        <div className="fixed inset-x-0 bottom-20 -translate-y-1/2 bg-white rounded-4xl shadow-xl p-6 w-full max-w-sm mx-auto">
          <div className="flex justify-center gap-x-10 text-center">

            {/* 時間 */}
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 mb-2">時間</span>
              <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
                {time}分
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ChevronLeft
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={decreaseTime}
                />
                <span>{time}分</span>
                <ChevronRight
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={increaseTime}
                />
              </div>
            </div>

            {/* 環境音 */}
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 mb-2">環境音</span>
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  sounds[soundIndex].name === "なし"
                    ? "bg-gray-300 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                <CurrentSoundIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ChevronLeft
                  className="w-4 h-4 text-gray-600 cursor-pointer"
                  onClick={prevSound}
                />
                <span>{sounds[soundIndex].name}</span>
                <ChevronRight
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={nextSound}
                />
              </div>
            </div>

            {/* アシスト */}
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 mb-2">アシスト</span>
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  assists[assistIndex].name === "あり"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <CurrentAssistIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ChevronLeft
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={prevAssist}
                />
                <span>{assists[assistIndex].name}</span>
                <ChevronRight
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={nextAssist}
                />
              </div>
            </div>

          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2 bg-green-600 text-white rounded-full shadow"
            >
              やめる
            </button>
            <button
              onClick={() => router.push("/meditation/timer")}
              className="flex-1 py-2 bg-gray-300 text-black rounded-full shadow"
            >
              開始
            </button>
          </div>
        </div>

        <HomeButton />
      </main>
    </BackgroundWrapper>
  );
}