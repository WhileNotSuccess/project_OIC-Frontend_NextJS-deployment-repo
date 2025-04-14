"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
/* import useCustomFetch from "@/app/lib/customFetch"; */


const NoticeCarousel = () => {

  const noticeItems = [
    {
      title: "2025년 신입생 모집 안내",
      background: "bg-blue-500",
      url: "/home",
    },
    {
      title: "교환학생 지원 마감 임박",
      background: "bg-green-500",
      url: "/home",

    },
    {
      title: "글로벌 캠프 참가자 모집",
      background: "bg-purple-500",
      url: "/home",

    },
    {
      title: "글로벌 캠프 참가자 모집",
      background: "bg-red-500",
      url: "/home",

    },
    {
      title: "글로벌 캠프 참가자 모집",
      background: "bg-yellow-500",
      url: "/home",

    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // 초기값을 0으로 설정 (중앙에서 시작하도록 변경)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  /*   const customFetch = useCustomFetch(); */
  const cardWidth = 400;
  const gap = 1;

  const extendedItems = [...noticeItems, ...noticeItems, ...noticeItems]; // 항목을 3번 반복하여 무한 루프 효과
  const totalItems = extendedItems.length;
  const middleIndex = noticeItems.length; // 초기 중앙 위치

  const containerRef = useRef<HTMLDivElement>(null);

  // 자동 슬라이드 (드래그 중에는 일시 정지)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToSlide(currentIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  /*  useEffect(() => {
    const NewsItems = async () => {
      try {
        const response = await customFetch("/posts/news?limit=5&page=1", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data.data);
      } catch {
        console.error("Error fetching news data:");
      }
    };
    NewsItems();
  }, []); */

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(totalItems - noticeItems.length); // 맨 끝으로 가면 처음으로 돌아감
    } else if (index >= totalItems) {
      setCurrentIndex(0); // 맨 처음으로 가면 끝으로 돌아감
    } else {
      setCurrentIndex(index);
    }
    setIsTransitioning(true); // 전환 효과 활성화
  };

  // 무한 루프 
  useEffect(() => {
    if (currentIndex === totalItems - noticeItems.length) {
      // 오른쪽 끝 도달 → 중앙으로 점프
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleIndex);
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (currentIndex === 0) {
      // 왼쪽 끝 도달 → 중앙으로 점프
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleIndex);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalItems, noticeItems.length]);

  // 드래그 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const movedX = e.clientX - startX;
    setTranslateX(movedX); // 드래그 시 이동
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translateX > 50) {
      goToSlide(currentIndex - 1); // 왼쪽으로 넘어가면 이전 슬라이드
    } else if (translateX < -50) {
      goToSlide(currentIndex + 1); // 오른쪽으로 넘어가면 다음 슬라이드
    }
    setTranslateX(0); // 드래그 종료 후 초기화
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div
      className="overflow-hidden w-full relative cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="flex"
        style={{
          transform: `translateX(calc(${-currentIndex * (cardWidth + gap)}px + ${translateX}px))`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex-shrink-0 text-white p-4"
            style={{
              width: `${cardWidth}px`,
              marginRight: `${gap}px`,
            }}
          ><div className="bg-black ">


              <div
                className="h-[180px] flex flex-col justify-center items-center relative overflow-hidden"
              >

                <div
                  className={`absolute inset-0  ${item.background}`}
                  style={{ opacity: 0.5 }}
                />


                <div className="relative z-10 text-white text-center select-none p-2 mt-20">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <Link
                    href={`${item.url}`}
                    className="h-1/4 flex items-center justify-center underline">
                    View More
                  </Link>
                </div>
              </div>


            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeCarousel;
