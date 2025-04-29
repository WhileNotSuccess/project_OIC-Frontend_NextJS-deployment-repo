"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSprings, animated } from "@react-spring/web";
import useCustomFetch from "@/app/hook/customFetch";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { GlobalCarouselMessage } from "@/app/menu";

interface NoticeItem {
  postId: string;
  title: string;
  description: string;
  id: string;
  image: string;
}

const GlobalCarousel = () => {
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const fetchNoticeItems = async () => {
      try {
        const response = await customFetch("/carousel", {
          method: "GET",
        });
        const data = await response.json();
        setNoticeItems(data.data);
        console.log(data.data);
      } catch {
        console.error(GlobalCarouselMessage[language].LoadingError);
      }
    };

    fetchNoticeItems();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const gap = 1;
  const cardPerView = 1.5;
  const [cardWidth, setCardWidth] = useState(0);

  const extendedItems = [...noticeItems, ...noticeItems, ...noticeItems];
  const totalItems = extendedItems.length;
  const middleIndex = noticeItems.length;

  useEffect(() => {
    if (wrapperRef.current) {
      const totalWidth = wrapperRef.current.offsetWidth;
      setCardWidth((totalWidth - gap * (cardPerView - 1)) / cardPerView);
      setCurrentIndex(middleIndex);
    }
  }, [noticeItems.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToSlide(currentIndex + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(totalItems - noticeItems.length);
    } else if (index >= totalItems) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (
      currentIndex === totalItems - noticeItems.length ||
      currentIndex === 0
    ) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleIndex);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, middleIndex, totalItems, noticeItems.length]);

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
    if (isDragging) handleMouseUp();
  };

  const [springs] = useSprings(extendedItems.length, (index) => {
    const relativeIndex = index - currentIndex;
    return {
      transform:
        relativeIndex === 0
          ? "scale(1.1) rotateY(0deg) translateZ(50px)"
          : `scale(0.9) rotateY(${relativeIndex < 0 ? 40 : -40}deg) translateZ(-50px)`,
      zIndex: relativeIndex === 0 ? 10 : 1,
      config: { tension: 250, friction: 22 },
    };
  });

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden w-full relative cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(calc(${-currentIndex * (cardWidth + gap) - ((-cardPerView + 1) / 2) * (cardWidth + gap)}px + ${translateX}px))`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {springs.map((springStyle, index) => {
          const item = extendedItems[index];
          return (
            <animated.div
              key={`${item.title}-${index}`}
              style={{
                ...springStyle,
                width: `${cardWidth}px`,
                marginRight: `${gap}px`,
                boxShadow:
                  index - currentIndex === 0
                    ? "0 15px 30px rgba(0,0,0,0.3)"
                    : "0 10px 20px rgba(0,0,0,0.15)",
              }}
              className="flex-shrink-0"
            >
              <div
                className="relative h-[450px] flex flex-col justify-center items-center overflow-hidden"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 opacity-30 bg-black backdrop-blur-sm" />
                <div className="relative z-10 text-white text-center select-none p-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${item.postId}`}
                    className="inline-block mt-4 underline"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </animated.div>

          );
        })}
      </div>
    </div>
  );
};

export default GlobalCarousel;
