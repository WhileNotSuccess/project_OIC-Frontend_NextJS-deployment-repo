"use client";

import { useEffect, useMemo, useState } from "react";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function Calendar() {
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    setCurrentDate(new Date());
    setToday(new Date());
  }, []);

  // 모든 hooks를 조건부 return 이전에 호출
  const year = currentDate?.getFullYear() ?? new Date().getFullYear();
  const month = currentDate?.getMonth() ?? new Date().getMonth();
  const firstDayOfMonth = currentDate ? new Date(year, month, 1).getDay() : 0;
  const lastDayOfMonth = currentDate ? new Date(year, month + 1, 0).getDate() : 0;

  const days = useMemo(() => {
    if (!currentDate) return [];
    const daysArray: (number | null)[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      daysArray.push(i);
    }

    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push(null);
    }

    return daysArray;
  }, [firstDayOfMonth, lastDayOfMonth, currentDate]);

  const monthNames = language === "english"
    ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    : language === "japanese"
    ? ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const dayNames = language === "english"
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : language === "japanese"
    ? ["日", "月", "火", "水", "木", "金", "土"]
    : ["일", "월", "화", "수", "목", "금", "토"];

  const isToday = useMemo(() => {
    if (!today) return () => false;
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    return (day: number | null) => {
      if (day === null) return false;
      return (
        day === todayDate &&
        month === todayMonth &&
        year === todayYear
      );
    };
  }, [today, month, year]);

  if (!currentDate || !today) {
    return null;
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
    setToday(now);
  };

  const isSelected = (day: number | null) => {
    if (day === null || !selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDate(new Date(year, month, day));
    }
  };

  const prevText = language === "english" ? "Previous" : language === "japanese" ? "前月" : "이전달";
  const nextText = language === "english" ? "Next" : language === "japanese" ? "次月" : "다음달";
  const todayText = language === "english" ? "Today" : language === "japanese" ? "今日" : "오늘";
  const selectedText = language === "english" ? "Selected Date: " : language === "japanese" ? "選択された日付: " : "선택된 날짜: ";

  return (
    <div className="w-full px-12 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            ← {prevText}
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {year} {monthNames[month]}
            </h2>
          </div>
          <button
            onClick={goToNextMonth}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            {nextText} →
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            {todayText}
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="text-center font-bold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            const isTodayDay = isToday(day);
            const isSelectedDay = isSelected(day);
            const className = `aspect-square p-2 rounded-md transition duration-200 ${
              day === null
                ? "text-gray-300 cursor-default"
                : "text-gray-800 hover:bg-blue-100 cursor-pointer"
            } ${
              isTodayDay ? "bg-blue-500 text-white font-bold" : ""
            } ${
              isSelectedDay && !isTodayDay ? "bg-blue-200 border-2 border-blue-500" : ""
            }`;

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={className}
                disabled={day === null}
              >
                {day}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">
              <span className="font-semibold">{selectedText}</span>
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

