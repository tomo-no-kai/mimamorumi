"use client";
import Link from "next/link";
import { Smile, Heart, BookMarked, Bolt, Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearStorage = () => {
    localStorage.clear();
    alert("ローカルストレージを削除しました");
    setShowConfirm(false);
    setShowDeleteModal(false);
    router.push("/"); // ホームに戻る
  };

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
              pathname.startsWith("/journal") ? "text-orange-400" : "text-green-600"
            }`}
          />
          <span className="text-xs p-1 ">ジャーナリング</span>
        </Link>
      </div>

      {/* 下段のグレーメニュー */}
      <div className="flex gap-3 self-end">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-gray-400 rounded-full shadow"
        >
          <Bolt className="w-4 h-4" />
          <span className="text-sm">設定</span>
        </button>

        <button
          onClick={() => router.push("/logs")}
          className="flex items-center gap-1 px-4 py-2 text-white bg-gray-400 rounded-full shadow"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">記録</span>
        </button>
      </div>

      {/* データ削除モーダル */}
      {showDeleteModal && !showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-4xl  p-6 flex flex-col items-center gap-4 w-80 shadow-2xl">
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-full shadow w-full"
            >
              データ削除
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-full shadow w-full"
            >
              とじる
            </button>
          </div>
        </div>
      )}

      {/* 確認モーダル */}
      {showConfirm && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-4xl p-6 flex flex-col items-center gap-4 w-80 shadow-2xl">
          <p className="text-center">
            本当にデータを削除しますか？<br />
            <span className="text-red-500">!&nbsp;データは復元できません</span>
          </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowDeleteModal(false);
                  router.push("/");
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-full flex-1"
              >
                キャンセル
              </button>
              <button
                onClick={handleClearStorage}
                className="px-4 py-2 bg-red-500 text-white rounded-full flex-1"
                >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}