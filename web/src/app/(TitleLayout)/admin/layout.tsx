"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // 사이드바 하위 메뉴 펼치기/닫기 상태 관리
  const [open, setOpen] = useState<number>(0);

  const toggleSubMenu = (menu: number) => {
    setOpen(menu); // 하위 메뉴 펼침/닫힘
  };

  return (
    <div className="flex">
      <aside className="left-0 h-full w-96 bg-gray-200 font-bold p-4">
        <ul>
          <li className="mb-4">
            <button
              onClick={() => {
                toggleSubMenu(1);
              }}
              className="w-full text-left text-lg text-[#0093EE]"
            >
              게시판 페이지
            </button>
            {open === 1 && (
              <ul className="ml-4 mt-2">
                <li>
                  <Link
                    href="/admin/review"
                    className="block hover:underline text-xs"
                  >
                    유학생 후기
                  </Link>                    
                </li>
                <li>
                  <Link
                    href="/admin/application-form"
                    className="block hover:underline text-xs"
                  >
                    신청 서류
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/learning-materials"
                    className="block hover:underline text-xs"
                  >
                    학습 자료 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/notice"
                    className="block hover:underline text-xs"
                  >
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/news"
                    className="block hover:underline text-xs"
                  >
                    한국어교육센터 알림
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/faq"
                    className="block hover:underline text-xs"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-4">
            <button
              onClick={() => {
                toggleSubMenu(2);
              }}
              className="w-full text-left text-lg text-[#0093EE]"
            >
              안내 페이지
            </button>
            {open === 2 && (
              <ul className="ml-4 mt-2">
                <li>
                  <Link
                    href="/admin/introduction"
                    className="block hover:underline text-xs"
                  >
                    한국어 교육센터 소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/directions"
                    className="block hover:underline text-xs"
                  >
                    오시는 길
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/visa"
                    className="block hover:underline text-xs"
                  >
                    비자 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/dormitory"
                    className="block hover:underline text-xs"
                  >
                    기숙사 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/facility"
                    className="block hover:underline text-xs"
                  >
                    학교 시설 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/insurance"
                    className="block hover:underline text-xs"
                  >
                    건강 보험 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/korean-outline"
                    className="block hover:underline text-xs"
                  >
                    한국어교육과정 개요
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/korean-sample"
                    className="block hover:underline text-xs"
                  >
                    한국어교육과정 프로그램 샘플
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/opencampus-purpose"
                    className="block hover:underline text-xs"
                  >
                    오픈캠퍼스 목적
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/opencampus-content"
                    className="block hover:underline text-xs"
                  >
                    오픈캠퍼스 일정 및 내용
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/opencampus-schedule"
                    className="block hover:underline text-xs"
                  >
                    오픈캠퍼스 스케쥴
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/procedure-guide"
                    className="block hover:underline text-xs"
                  >
                    입학신청 절차안내
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-4">
            <button
              onClick={() => {
                toggleSubMenu(3);
              }}
              className="w-full text-left text-lg text-[#0093EE]"
            >
              신청/파일 확인
            </button>
            {open === 3 && (
              <ul className="ml-4 mt-2">
                <li>
                  <Link
                    href="/admin/counseling"
                    className="block hover:underline text-xs"
                  >
                    상담 신청 확인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/applications"
                    className="block hover:underline text-xs"
                  >
                    서류확인
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-4">
            <Link
              href="/admin/banner"
              className="w-full text-left text-lg text-[#0093EE]"
            >
              배너
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/staff"
              className="w-full text-left text-lg text-[#0093EE]"
            >
              강사진 및 교직원 소개
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/guidelinesForApplicants"
              className="w-full text-left text-lg text-[#0093EE]"
            >
              모집요강
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/applicants"
              className="w-full text-left text-lg text-[#0093EE]"
            >
              입학신청서
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/admin/course"
              className="w-full text-left text-lg text-[#0093EE]"
            >
              강좌
            </Link>
          </li>
        </ul>
      </aside>

      <main className="p-4 w-full">{children}</main>
    </div>
  );
}
