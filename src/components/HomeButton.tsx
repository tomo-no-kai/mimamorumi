"use client";
import Link from "next/link";
import { Smile, Heart, BookMarked, Bolt, Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-[90%] max-w-md">
      <div className="flex bg-white rounded-full shadow-lg overflow-hidden w-full">
        <Link
          href="/meditation"
          className="flex-1 flex flex-col items-center py-3 hover:bg-gray-100"
        >
          <Smile
            className={`w-8 h-8 ${
              pathname.startsWith("/meditation") ? "text-orange-400" : "text-green-600"
            }`}
          />
          <span className="text-xs p-1">めいそう</span>
        </Link>

        <Link
          href="/"
          className="flex-1 flex flex-col items-center py-3 border-l border-r border-gray-200 hover:bg-gray-100"
        >
          <Heart
            className={`w-8 h-8 ${
              pathname === "/" ? "text-orange-400" : "text-green-600"
            }`}
          />
          <span className="text-xs p-1">ホーム</span>
        </Link>

        <Link
          href="/journal"
          className="flex-1 flex flex-col items-center py-3 hover:bg-gray-100"
        >
          <BookMarked
            className={`w-8 h-8 ${
              pathname === "/journal" ? "text-orange-400" : "text-green-600"
            }`}
          />
          <span className="text-xs p-1 ">ジャーナリング</span>
        </Link>
      </div>

      {/* 下段のグレーメニュー */}
      <div className="flex gap-3 self-end">
        <button className="flex items-center gap-1 px-4 py-2 text-white bg-gray-400 rounded-full shadow">
          <Bolt className="w-4 h-4" />
          <span className="text-sm">設定</span>
        </button>
        <button onClick={() => router.push("/logs")} className="flex items-center gap-1 px-4 py-2 text-white bg-gray-400 rounded-full shadow">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">記録</span>
        </button>
      </div>
    </div>
  );
}