// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Language } from "@/app/common/types";
// import Cookies from "js-cookie";
// import { calendarMenu } from "@/app/menu";

// export default function Calendar() {
//   const [language, setLanguage] = useState<Language>(Language.korean);
//   const [currentDate, setCurrentDate] = useState<Date | null>(null);
//   const [today] = useState<Date>(new Date());

//   useEffect(() => {
//     const savedLanguage = Cookies.get("language") as Language;
//     if (savedLanguage) {
//       setLanguage(savedLanguage);
//     }
//     setCurrentDate(new Date());
//   }, []);

//   const year = currentDate?.getFullYear() ?? new Date().getFullYear();
//   const month = currentDate?.getMonth() ?? new Date().getMonth();
//   const firstDayOfMonth = currentDate ? new Date(year, month, 1).getDay() : 0;
//   const lastDayOfMonth = currentDate ? new Date(year, month + 1, 0).getDate() : 0;

//   const days = useMemo(() => {
//     if (!currentDate) return [];
//     const daysArray: (number | null)[] = [];

//     for (let i = firstDayOfMonth - 1; i >= 0; i--) {
//       daysArray.push(null);
//     }

//     for (let i = 1; i <= lastDayOfMonth; i++) {
//       daysArray.push(i);
//     }

//     const remainingDays = 42 - daysArray.length;
//     for (let i = 1; i <= remainingDays; i++) {
//       daysArray.push(null);
//     }

//     return daysArray;
//   }, [firstDayOfMonth, lastDayOfMonth, currentDate]);

//   const monthNames = calendarMenu[language].monthNames as string[];
//   const dayNames = calendarMenu[language].dayNames as string[];

//   const { todayDate, todayMonth, todayYear } = useMemo(() => ({
//     todayDate: today.getDate(),
//     todayMonth: today.getMonth(),
//     todayYear: today.getFullYear(),
//   }), [today]);

//   if (!currentDate) {
//     return null;
//   }

//   const isToday = (day: number | null) => {
//     if (day === null) return false;
//     return (
//       day === todayDate &&
//       month === todayMonth &&
//       year === todayYear
//     );
//   };

//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(year, month - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(new Date(year, month + 1, 1));
//   };

//   const prevText = calendarMenu[language].prevText as string;
//   const nextText = calendarMenu[language].nextText as string;

//   return (
//     <div className="w-full px-12 py-10">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={goToPreviousMonth}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             ← {prevText}
//           </button>
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {year} {monthNames[month]}
//             </h2>
//           </div>
//           <button
//             onClick={goToNextMonth}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             {nextText} →
//           </button>
//         </div>

//         <div className="grid grid-cols-7 border border-gray-300">
//           {dayNames.map((day, index) => (
//             <div
//               key={index}
//               className="text-center font-bold text-gray-600 py-2 border-r border-b border-gray-300 last:border-r-0"
//             >
//               {day}
//             </div>
//           ))}

//           {days.map((day, index) => {
//             const isTodayDay = isToday(day);
//             const isLastInRow = (index + 1) % 7 === 0;
//             const className = `aspect-square p-2 flex items-start justify-start border-r border-b border-gray-300 transition duration-200 ${
//               isLastInRow ? "border-r-0" : ""
//             } ${
//               day === null
//                 ? "text-gray-300 cursor-default bg-gray-50"
//                 : "text-gray-800"
//             } ${
//               isTodayDay ? "bg-blue-500 text-white font-bold" : ""
//             }`;

//             return (
//               <div
//                 key={index}
//                 className={className}
//               >
//                 {day}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
