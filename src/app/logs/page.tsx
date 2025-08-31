"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  format,
  getDate,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameDay,
} from "date-fns";
import { Smile, BookMarked } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type RecordDetail = {
  type: string;
  duration: number;
  feeling?: string;
  icon: "smile";
  image?: string;
};

export default function CalendarView() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [records, setRecords] = useState<Record<string, RecordDetail>>({});

  useEffect(() => {
    const stored = localStorage.getItem("meditationRecords");
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const moveMonth = (amount: number) => {
    const newDate =
      amount > 0 ? addMonths(currentDate, amount) : subMonths(currentDate, Math.abs(amount));
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  // const addRecord = (dateStr: string, record: RecordDetail) => {
  //   const newRecords = { ...records, [dateStr]: record };
  //   setRecords(newRecords);
  //   localStorage.setItem("meditationRecords", JSON.stringify(newRecords));
  // };

  // 詳細表示用関数に切り出す
  const renderRecordDetail = () => {
    if (!selectedDate) return null;
    const key = format(selectedDate, "yyyy-MM-dd");
    const record = records[key];
    if (!record) return null;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm">
        <p className="mb-2">{format(selectedDate, "yyyy年M月d日")}</p>

        <div className="flex items-center gap-3 mb-3">
          <Smile className="w-5 h-5 text-green-600" />
          <span>
            {record.type}　{record.duration}分
          </span>
        </div>

        {record.feeling && (
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-green-600" />
            <span>{record.feeling}</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="max-w-[400px] mx-auto bg-white px-4 py-6 mt-6 text-sm font-sans text-neutral-800">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-7">
        <button onClick={() => moveMonth(-1)}>&lt;</button>
        <h2 className="text-base font-medium">{format(currentDate, "yyyy年M月")}</h2>
        <button onClick={() => moveMonth(1)}>&gt;</button>
      </div>

      {/* 曜日ラベル */}
      <div className="grid grid-cols-7 text-center font-medium text-[13px] mb-1">
        {["日", "月", "火", "水", "木", "金", "土"].map((d, idx) => (
          <div key={d} className={idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : ""}>
            {d}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs mb-4">
        {days.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const record = records[dateStr];
          const icon = record?.icon;
          const isSelected = selectedDate && isSameDay(selectedDate, date);

          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(date)}
              className="h-16 flex flex-col items-center justify-center cursor-pointer"
            >
              <div
                className={`w-6 h-6 flex items-center justify-center text-[12px] ${
                  isSelected ? "bg-gray-200 rounded-full" : ""
                }`}
              >
                {getDate(date)}
              </div>

              {/* アイコン表示 */}
              <div className="h-4 mt-1 flex items-center justify-center gap-1">
                {icon === "smile" && <Smile className="w-4 h-4 text-green-500" />}
                {record?.image && (
              <Image
                src={`/stamps/${record.image}.svg`}
                alt="stamp"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* 詳細表示 */}
      {renderRecordDetail()}

      {/* 戻るボタン */}
      <button
        onClick={() => router.push("/")}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white rounded-full px-6 py-2 text-sm shadow"
      >
        もどる
      </button>
    </div>
  );
}