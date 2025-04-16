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
                    href="/admin/faq"
                    className="block hover:underline text-sm p-2"
                  >
                    FAQ
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
                    href="/admin/directions"
                    // href="/admin/contact"
                    className="block hover:underline text-sm p-2"
                  >
                    연락처
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/procedure-guide"
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
                    기숙사 안내
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
                    href="/admin/dormitory"
                    className="block hover:underline text-sm p-2"
                  >
                    기숙사 안내
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
              신청/파일 확인
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/application:translate-y-[65%] group-hover/application:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/counseling"
                    className="block hover:underline text-sm p-2"
                  >
                      상담 신청 확인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/applications"
                    className="block hover:underline text-sm p-2"
                  >
                      서류확인
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="group/banner relative flex justify-center items-center w-44 h-12">
            <div className="text-center text-lg text-[#0093EE]">
                배너
            </div>
            <div className="absolute top-0 w-44 bg-gray-200 text-[#0093EE] text-center opacity-0 translate-y-[-100%] 
              group-hover/banner:translate-y-[125%] group-hover/banner:opacity-100 transition-transform 
              duration-300 ease-in-out z-4">
              <ul>
                <li>
                  <Link
                    href="/admin/banner"
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
                강사진 및 교직원 소개
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
        </ul>
      </aside>
      {/* <section
        className="hidden xl:hidden xl:peer-hover:block xl:hover:block xl:w-full xl:min-h-56 xl:z-50 xl:bg-[#143c64] xl:bg-opacity-[88%] xl:absolute"
        style={{ top: "48px" }}
      >
        <div className="flex justify-center">
          <div className="w-44 text-white text-center flex flex-col justify-evenly">
            <ul>
              <li>
                <Link
                  href="/admin/notice"
                  className="block hover:underline text-base"
                >
                      공지사항
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/news"
                  className="block hover:underline text-base"
                >
                  알림
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/faq"
                  className="block hover:underline text-base"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-44 text-center text-white flex flex-col justify-evenly">
            <ul>
              <li>
                <Link
                  href="/admin/introduction"
                  className="block hover:underline text-base"
                >
                  소개글
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/directions"
                  // href="/admin/contact"
                  className="block hover:underline text-base"
                >
                  연락처
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/procedure-guide"
                  className="block hover:underline text-base"
                >
                  입학 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dormitory"
                  className="block hover:underline text-base"
                >
                  기숙사 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/student-support"
                  className="block hover:underline text-base"
                >
                  학생 지원 서비스
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dormitory"
                  className="block hover:underline text-base"
                >
                  기숙사 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/global-internships"
                  className="block hover:underline text-base"
                >
                  글로벌 현장학습
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/overseas-careers"
                  className="block hover:underline text-base"
                >
                  해외취업지원센터
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-44 text-center text-white">
            <ul>
              <li>
                <Link
                  href="/admin/counseling"
                  className="block hover:underline text-base"
                >
                    상담 신청 확인
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/applications"
                  className="block hover:underline text-base"
                >
                    서류확인
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-44">

          </div>
          <div className="w-44">

          </div>
        </div>
      </section> */}

      <main className="p-4 w-full">{children}</main>
    </div>
  );
}
