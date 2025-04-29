"use client";

import { useEffect, useRef, useState } from "react";
import useCustomFetch from "@/app/hook/customFetch";
import Link from "next/link";
import Image from "next/image";
import { NewsMessage } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

interface NewsItem {
  title: string;
  content: string;
  date: string;
  id: string;
}

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const customFetch = useCustomFetch();

  const [language, setLanguage] = useState<Language>(Language.korean);

  const cardWidth = 260;
  const gap = 20;

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const GetNewsItems = async () => {
      try {
        const response = await customFetch("/post/main/notices", {
          method: "GET",
        });
        const data = await response.json();
        setNewsItems(data.data);
      } catch {
        console.error(NewsMessage[language].error);
      }
    };
    GetNewsItems();
  }, []);

  const extendedItems = [...newsItems, ...newsItems, ...newsItems];
  const totalItems = extendedItems.length;
  const middleIndex = newsItems.length;

  const containerRef = useRef<HTMLDivElement>(null);

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
      setCurrentIndex(totalItems - newsItems.length);
    } else if (index >= totalItems) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (currentIndex === totalItems - newsItems.length || currentIndex === 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleIndex);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalItems, newsItems.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const movedX = e.clientX - startX;
    setTranslateX(movedX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translateX > 50) {
      goToSlide(currentIndex - 1);
    } else if (translateX < -50) {
      goToSlide(currentIndex + 1);
    }
    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div
      className="w-full overflow-hidden relative cursor-grab"
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
        {extendedItems.map((item, index) => {


          const formattedDate = new Date(item.date)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, "-")
            .replace(/\.$/, "");

          return (
            <div
              key={`${item.title}-${index}`}
              className="flex-shrink-0 text-white"
              style={{
                width: `${cardWidth}px`,
                marginRight: `${gap}px`,
              }}
            >
              <Link href={`/news/${item.id}`}>
                <div className="bg-gray-100 rounded-md overflow-hidden">
                  <div className="h-[220px] flex flex-col justify-start items-center relative">
                    <div className="relative z-10 text-black text-center select-none p-2">
                      <h3 className="text-xl font-bold line-clamp-2">{item.title}</h3>
                    </div>

                    <div className="relative z-10 text-black text-center select-none p-2 mt-2">
                      <p className="text-xs line-clamp-3">{item.content}</p>
                    </div>

                    <div
                      className="w-full h-[1px] bg-blue-900 mt-2"
                      style={{ position: "absolute", bottom: "40px" }}
                    >

                    </div>

                    <div className="absolute bottom-2 w-full text-black text-center select-none p-2">
                      <div className="flex items-center justify-center ">
                        <Image
                          src="/images/timeIcon.png"
                          alt="timeIcon"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        <p className="text-xs">{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsCarousel;
