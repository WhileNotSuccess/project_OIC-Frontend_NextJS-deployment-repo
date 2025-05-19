"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useCustomFetch from "@/app/hook/customFetch";
import Image from "next/image";
import { Language } from "@/app/common/types";
import { NoticeMessage } from "@/app/menu";
import Cookies from "js-cookie";

interface NoticeItem {
  title: string;
  imageUrl: string;
  postId: string;
  date: string;
}



const NoticeCarousel = () => {
  const [language, setLanguage] = useState<Language>(Language.korean);



  const [currentIndex, setCurrentIndex] = useState(0); // 초기값을 0으로 설정 (중앙에서 시작하도록 변경)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const customFetch = useCustomFetch();
  const cardWidth = 540;
  const gap = 20;

  const containerRef = useRef<HTMLDivElement>(null);

  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]);


  useEffect(() => {

    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const NewsItems = async () => {
      try {
        const response = await customFetch("/post/main/news", {
          method: "GET",
        });
        const data = await response.json();
        setNoticeItems(data.data);
      } catch {
        console.error(NoticeMessage[language].LoadingError);
      }
    };
    NewsItems();
  }, []);

  const extendedItems = [...noticeItems, ...noticeItems, ...noticeItems];
  const totalItems = extendedItems.length;
  const middleIndex = noticeItems.length;


  // 자동 슬라이드 (드래그 중에는 일시 정지)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToSlide(currentIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);


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
            className="flex-shrink-0 text-white "
            style={{
              width: `${cardWidth}px`,
              marginRight: `${gap}px`,
            }}
          ><div className="bg-black ">


              <div
                className="h-[300px] flex flex-col justify-center items-center relative overflow-hidden"
              >

                <Image
                  width={540}
                  height={300}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files${item.imageUrl}`}
                  alt={item.title}
                  className={"absolute inset-0 w-full h-full object-cover"}
                  style={{ opacity: 0.5 }}
                  unoptimized
                />


                <div className="relative z-10 text-white select-none  mt-40 mr-80">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <Link
                    href={`board/news/${item.postId}`}
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
