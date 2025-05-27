"use client";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  //사이드바 하위 메뉴 펼치기/닫기 상태 관리
  // const [open, setOpen] = useState<number>(0);

  // const toggleSubMenu = (menu: number) => {
  //   setOpen(menu); // 하위 메뉴 펼침/닫힘
  // };

  return (
    <div className="flex flex-col">
      <aside className="left-0 w-full bg-gray-200 font-bold peer">
        <ul className="flex flex-row justify-center w-full">
          <li className="group/board relative flex justify-center items-center w-44 h-12">
            <div
              className="text-lg text-[#0093EE]"
            >
              게시판 페이지
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/board:translate-y-[44%] group-hover/board:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/notice"
                    className="block hover:underline text-sm p-2"
                  >
                        공지사항
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/news"
                    className="block hover:underline text-sm p-2"
                  >
                    알림
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/qna"
                    className="block hover:underline text-sm p-2"
                  >
                    QNA
                  </Link>
                </li>
              </ul>
            </div>

          </li>

          <li className="group/guidance relative flex justify-center items-center w-44 h-12">
            <div
              className="text-lg text-[#0093EE]"             
            >
              안내 페이지
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/guidance:translate-y-[16%] group-hover/guidance:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/introduction"
                    className="block hover:underline text-sm p-2"
                  >
                    소개글
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/contact"
                    className="block hover:underline text-sm p-2"
                  >
                    연락처
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/admission-guide"
                    className="block hover:underline text-sm p-2"
                  >
                    입학 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/dormitory"
                    className="block hover:underline text-sm p-2"
                  >
                    기숙사 정보
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/student-support"
                    className="block hover:underline text-sm p-2"
                  >
                    학생 지원 서비스
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/global-internships"
                    className="block hover:underline text-sm p-2"
                  >
                    글로벌 현장학습
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/overseas-careers"
                    className="block hover:underline text-sm p-2"
                  >
                    해외취업지원센터
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="group/application relative flex justify-center items-center w-44 h-12">
            <div
              className="text-center text-lg text-[#0093EE]"
            >
              모집요강/입학신청서
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/application:translate-y-[65%] group-hover/application:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/guidelinesForApplicants"
                    className="block hover:underline text-sm p-2"
                  >
                      모집요강
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/applicants"
                    className="block hover:underline text-sm p-2"
                  >
                      입학신청서
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="group/banner relative flex justify-center items-center w-44 h-12">
            <div className="text-center text-lg text-[#0093EE]">
                Pride Of YJU
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/banner:translate-y-[125%] group-hover/banner:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/PrideOfYJU"
                    className="block hover:underline text-sm p-2"
                  >
                      바로가기
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="group/staff relative flex justify-center items-center w-44 h-12">
            <div className="text-center text-lg text-[#0093EE]">
              교직원 소개
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/staff:translate-y-[125%] group-hover/staff:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/staff"
                    className="block hover:underline text-sm p-2"
                  >
                      바로가기
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="group/staff relative flex justify-center items-center w-44 h-12">
            <div className="text-center text-lg text-[#0093EE]">
              글로벌 프로그램
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/staff:translate-y-[125%] group-hover/staff:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/global-programs"
                    className="block hover:underline text-sm p-2"
                  >
                      바로가기
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="group/staff relative flex justify-center items-center w-44 h-12">
            <div className="text-center text-lg text-[#0093EE]">
              국가, 협약기관 수정
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/staff:translate-y-[125%] group-hover/staff:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/countries"
                    className="block hover:underline text-sm p-2"
                  >
                      바로가기
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
