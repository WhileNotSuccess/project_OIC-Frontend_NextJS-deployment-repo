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
        const response = await customFetch("/carousel", { method: "GET" });
        const data = await response.json();
        setNoticeItems(data.data);
      } catch {
        console.error(GlobalCarouselMessage[language].LoadingError);
      }
    };

    fetchNoticeItems();
    console.log(noticeItems);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const gap = 16; // px
  const cardPerView = 1.5;
  const [cardWidth, setCardWidth] = useState(0);

  const extendedItems = [...noticeItems, ...noticeItems, ...noticeItems];
  const totalItems = extendedItems.length;
  const middleIndex = noticeItems.length;

  const [currentIndex, setCurrentIndex] = useState(middleIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const updateCardWidth = () => {
    if (wrapperRef.current) {
      const totalWidth = wrapperRef.current.offsetWidth;
      const newCardWidth = (totalWidth - gap * (cardPerView - 1)) / cardPerView;
      setCardWidth(newCardWidth);
    }
  };

  const [springs, api] = useSprings(extendedItems.length, (index) => {
    const relativeIndex = index - currentIndex;
    const isCenter = relativeIndex === 0;
    return {
      transform: isCenter
        ? "scale(1.1) rotateY(0deg)"
        : `scale(0.9) rotateY(${relativeIndex < 0 ? 30 : -30}deg)`,
      zIndex: isCenter ? 10 : 1,
      config: { tension: 250, friction: 25 },
    };
  });


  useEffect(() => {
    updateCardWidth();
    setCurrentIndex(middleIndex);

    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
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
    api.start((index) => {
      const relativeIndex = index - currentIndex;
      const isCenter = relativeIndex === 0;
      return {
        transform: isCenter
          ? "scale(1.1) rotateY(0deg)"
          : `scale(0.9) rotateY(${relativeIndex < 0 ? 30 : -30}deg)`,
        zIndex: isCenter ? 10 : 1,
        config: { tension: 250, friction: 25 },
      };
    },
    );
  }, [currentIndex, api, totalItems, noticeItems.length]);

  useEffect(() => {
    if (currentIndex === totalItems - noticeItems.length || currentIndex === 0) {
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



  const offsetX = ((cardPerView - 1) / 2) * (cardWidth + gap);

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
          transform: `translateX(${-currentIndex * (cardWidth + gap) + offsetX + translateX}px)`,
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
                transformStyle: "preserve-3d",
                boxShadow:
                  index - currentIndex === 0
                    ? "0 15px 30px rgba(0,0,0,0.3)"
                    : "0 10px 20px rgba(0,0,0,0.15)",
              }}
              className="flex-shrink-0"
            >
              <div
                className="relative h-[450px] flex flex-col justify-end items-start overflow-hidden p-6"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

                <div className="relative z-10 text-white max-w-full">
                  <h3 className="text-3xl font-extrabold mb-2 drop-shadow-md">{item.title}</h3>
                  <p className="text-lg mb-4 leading-snug drop-shadow-sm">{item.description}</p>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/board/globalPrograms/${item.postId}`}
                    className="inline-block bg-white text-black font-semibold px-4 py-2 mb-4 rounded-md shadow-md hover:bg-gray-100 transition"
                  >
                    Learn More
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
