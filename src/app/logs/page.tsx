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

type JournalRecord = {
  feeling?: string;
  image?: string;
};

type MeditationRecord = {
  minutes: number;
  date: string;
};

export default function CalendarView() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [journalRecords, setJournalRecords] = useState<Record<string, JournalRecord>>({});
  const [meditationRecords, setMeditationRecords] = useState<MeditationRecord[]>([]);

  // ローカルストレージから読み込み
  useEffect(() => {
    const journalStored = localStorage.getItem("journalRecords");
    if (journalStored) setJournalRecords(JSON.parse(journalStored));

    const meditationStored = localStorage.getItem("meditationRecords");
    if (meditationStored) setMeditationRecords(JSON.parse(meditationStored));
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

  const handleDateClick = (date: Date) => setSelectedDate(date);

  const renderRecordDetail = () => {
    if (!selectedDate) return null;
    const key = format(selectedDate, "yyyy-MM-dd");

    const journal = journalRecords[key];
    const meditation = meditationRecords.find(
      (r) => format(new Date(r.date), "yyyy-MM-dd") === key
    );

    if (!journal && !meditation) return <p className="text-sm text-gray-400">記録なし</p>;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm">
        <p className="mb-2">{format(selectedDate, "yyyy年M月d日")}</p>

        {meditation && (
          <div className="flex items-center gap-3 mb-2">
            <Smile className="w-5 h-5 text-green-600" />
            <span>瞑想 {meditation.minutes}分</span>
          </div>
        )}

        {journal && (
          <div className="flex items-center gap-3">
            {journal.feeling && (
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-green-600" />
                <span>{journal.feeling}</span>
              </div>
            )}
            {journal.image && (
              <Image
                src={`/stamps/${journal.image}.svg`}
                alt="stamp"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
          </div>
        )}
      </motion.div>
    );
  };

  // ジャーナル保存
  const saveJournal = (date: Date, memo: string, selectedStamp: string | null) => {
    const key = format(date, "yyyy-MM-dd");
    const newJournalRecords = {
      ...journalRecords,
      [key]: {
        ...journalRecords[key],
        feeling: memo,
        image: selectedStamp ?? undefined,
      },
    };
    setJournalRecords(newJournalRecords);
    localStorage.setItem("journalRecords", JSON.stringify(newJournalRecords));
  };

  // 瞑想保存
  const saveMeditation = (minutes: number, date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const newRecords = meditationRecords.filter(
      (r) => format(new Date(r.date), "yyyy-MM-dd") !== key
    );
    newRecords.push({ minutes, date: key });
    setMeditationRecords(newRecords);
    localStorage.setItem("meditationRecords", JSON.stringify(newRecords));
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
          const key = format(date, "yyyy-MM-dd");
          const journal = journalRecords[key];
          const meditation = meditationRecords.find(
            (r) => format(new Date(r.date), "yyyy-MM-dd") === key
          );
          const isSelected = selectedDate && isSameDay(selectedDate, date);

          return (
            <div
              key={key}
              onClick={() => handleDateClick(date)}
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
                {meditation && <Smile className="w-4 h-4 text-green-500" />}
                {journal?.image && (
                  <Image
                    src={`/stamps/${journal.image}.svg`}
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