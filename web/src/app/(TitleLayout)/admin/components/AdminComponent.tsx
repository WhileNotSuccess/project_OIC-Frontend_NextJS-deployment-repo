"use client";

import {
  ApplicationFormItemProp,
  Banner,
  Counseling,
  Course,
  TeacherGlobal,
} from "@/app/common/types";
import useCustomFetch from "@/app/hook/customFetch";
import { useEffect, useState } from "react";
import CounselingItem from "./CounselingItem";
import ApplicationFormItem from "./ApplicationFormItem";
import BoardPageCompo from "../../components/BoardPageCompo";
import BannerItem from "./BannerItem";
import BannerPostModal from "./BannerPostModal";
import StaffComponent from "./StaffComponent";
import StaffModal from "./StaffModal";
import Pagination from "../../components/Pagination"; // 페이지네이션 컴포넌트
import CourseModal from "./CourseModal";
import CourseComponent from "./CourseComponent";
import Title from "../../components/Title";

type AdminComponentProps = {
  category: string;
};

export default function AdminComponent({ category }: AdminComponentProps) {
  const customFetch = useCustomFetch();
  const [counselingList, setCounselingList] = useState<Counseling[]>([]);
  const [applications, setApplications] = useState<ApplicationFormItemProp[]>([]);
  const [bannerPostModal, setBannerPostModal] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [allStaff, setAllStaff] = useState<Record<string,TeacherGlobal[]>>({});
  const [staffPostModal, setStaffPostModal] = useState<boolean>(false);
  const [course, setCourse] = useState<Course[]>([]);
  const [coursePostModal, setCoursePostModal] = useState<boolean>(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 상담 신청 처리
  useEffect(() => {
    if (category === "counseling") {
      async function getCounseling() {
        const response = await customFetch("/consult");
        const data = await response.json();
        setCounselingList(data.data);
      }
      getCounseling();
    }
  },[category]);
  // 신청서 리스트를 받아오는 함수
  useEffect(()=>{
    if (category === "applications") {
      const getApplications = async (page: number) => {
        setLoading(true);
        const response = await customFetch(
          `/application-form?limit=10&page=${page}&ignore=true`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        setApplications(data.data);
        setCurrentPage(data.currentPage); // 현재 페이지 번호
        setTotalPages(data.totalPage); // 전체 페이지 수
        setPrevPage(data.prevPage); // 이전 페이지 번호
        setNextPage(data.nextPage); // 다음 페이지 번호
        setLoading(false);
      };
      getApplications(currentPage);
    }
  },[currentPage,category]);

  // 페이지네이션을 위한 함수
  const handlePageChange = (page: number | null) => {
    if (page) {
      setCurrentPage(page); // 페이지 변경
    }
  };

  useEffect(() => {
    if (category === "banner") {
      async function getBanners() {
        const response = await customFetch("/banners?ignore=true");
        const data = await response.json();
        console.log(data.data);
        setBanners(data.data);
      }
      getBanners();
    }
  }, [category]);

  
  useEffect(() => {
    if (category === "staff") {
      async function getStaff() {
        const response = await customFetch("/staff/admin");
        const data = await response.json();
        setAllStaff(data.data);
      }
      getStaff();
    }
  }, [category]);


  useEffect(() => {
    if (category === "course") {
      async function getCourse() {
        const response = await customFetch("/course");
        const data = await response.json();
        console.log(data);
        setCourse(data.data);
      }
      getCourse();
    }
  }, [category]);

  if(category==="counseling"){
    return (
      <>
        <h1 className="text-3xl mb-4 font-bold text-center">상담 신청 확인</h1>
        <div className="flex flex-row flex-wrap ">
          {counselingList.map((item) => {
            return (
              <div key={item.id}>
                <CounselingItem {...item} />
              </div>
            );
          })}
        </div>
      </>
    );
  }else if(category==="applications"){
    return (
      <>
        <h1 className="text-3xl mb-4 font-bold text-center">서류 확인</h1>
        <div className="flex flex-row flex-wrap ">
          {applications.map((item) => {
            return (
              <div key={item.id}>
                <ApplicationFormItem {...item} />
              </div>
            );
          })}
        </div>
        {/* 페이지네이션 */}
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            onPageChange={handlePageChange}
          />
        </div>
        {loading && <div>Loading...</div>} {/* 로딩 중 표시 */}
      </>
    );
  }else if(category==="banner"){
    return (
      <>
        {bannerPostModal ? (
          <BannerPostModal
            onClose={() => {
              setBannerPostModal(false);
            }}
          />
        ) : null}
        <h1 className="text-3xl mb-4 font-bold text-center">배너</h1>
        <div className="w-full">
          <button
            onClick={() => {
              setBannerPostModal(true);
            }}
            className="absolute text-white top-24 right-10 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            배너 추가
          </button>
        </div>
        <div className="flex flex-row flex-wrap ">
          {banners.map((item) => {
            return (
              <div key={item.id}>
                <BannerItem {...item} />
              </div>
            );
          })}
        </div>
      </>
    );
  }else if(category==="staff"){
    return (
      <>
        {staffPostModal && (
          <StaffModal
            onClose={() => {
              setStaffPostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap justify-between px-12">
          <h1 className="text-3xl mb-4 font-bold text-center w-full">
            교직원 소개
            <span className="p-4 text-right">
              <button
                onClick={() => {
                  setStaffPostModal(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                추가하기
              </button>
            </span>
          </h1>
          {
            Object.entries(allStaff).map(([key,value])=>(  // 구조분해 할당으로 새로운 배열 반환
              <div key={key}>
                <div className="text-2xl font-bold mb-2">
                  {key}
                </div>
                <StaffComponent item={value}/>
              </div>
            ),
            )
          }
        </div>
      </>
    );
  }else if(category==="course"){
    return (
      <>
        {coursePostModal && (
          <CourseModal
            onClose={() => {
              setCoursePostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap">
          <h1 className="text-3xl mb-4 font-bold text-center w-full">
            강좌
            <span className="p-4 text-right">
              <button
                onClick={() => {
                  setCoursePostModal(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                추가하기
              </button>
            </span>
          </h1>

          {course.map((item) => {
            return <CourseComponent key={item.id} {...item} />;
          })}
        </div>
      </>
    );
  }else{
    return (
      <div className="w-full flex flex-col">
        <Title category={category}/>
        <div className="w-full flex justify-center items-center">
          <BoardPageCompo name={category} />
        </div>
      </div>

    );
  }
}
