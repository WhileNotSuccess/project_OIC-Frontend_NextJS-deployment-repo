"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";

const GlobalCarousel = () => {
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
      title: "AI 해커톤 신청 접수 중",
      background: "bg-red-500",
      url: "/home",
    },
    {
      title: "산학 협력 프로젝트 참여 안내",
      background: "bg-yellow-500",
      url: "/home",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(noticeItems.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const gap = 20;
  const cardPerView = 1.5;

  const extendedItems = [...noticeItems, ...noticeItems, ...noticeItems];
  const totalItems = extendedItems.length;
  const middleIndex = noticeItems.length;

  const [cardWidth, setCardWidth] = useState(0);


  useEffect(() => {
    if (wrapperRef.current) {
      const totalWidth = wrapperRef.current.offsetWidth;
      setCardWidth((totalWidth - gap * (cardPerView - 1)) / cardPerView);
    }
  }, []);

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
  }, [currentIndex]);

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
        ref={containerRef}
        className="flex"
        style={{
          transform: `translateX(calc(${-currentIndex * (cardWidth + gap) -
            ((-cardPerView + 1) / 2) * (cardWidth + gap)}px + ${translateX}px))`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedItems.map((item, index) => {
          const relativeIndex = index - currentIndex;

          const springProps = useSpring({
            transform:
              relativeIndex === 0
                ? "scale(1.1) rotateY(0deg) translateZ(50px)"
                : `scale(0.9) rotateY(${relativeIndex < 0 ? 40 : -40}deg) translateZ(-50px)`,
            zIndex: relativeIndex === 0 ? 10 : 1,
            config: { tension: 250, friction: 22 },
          });

          return (
            <animated.div
              key={`${item.title}-${index}`}
              style={{
                ...springProps,
                width: `${cardWidth}px`,
                marginRight: `${gap}px`,
                boxShadow:
                  relativeIndex === 0
                    ? "0 15px 30px rgba(0,0,0,0.3)"
                    : "0 10px 20px rgba(0,0,0,0.15)",
              }}
              className="flex-shrink-0"
            >
              <div
                className={`relative h-[450px] flex flex-col justify-center items-center overflow-hidden ${item.background}`}
              >
                <div className="absolute inset-0 opacity-30 bg-black backdrop-blur-sm" />
                <div className="relative z-10 text-white text-center select-none p-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <Link href={item.url} className="inline-block mt-4 underline">
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
