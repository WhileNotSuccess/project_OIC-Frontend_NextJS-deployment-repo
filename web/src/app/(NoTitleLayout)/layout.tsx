import SideMenu from "@/SideMenu";
import "./globals.css";
import HamburgerMenuCompo from "../(TitleLayout)/components/HamburgerMenuCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "국제교류원 - 영진전문대",
  description:
    "국제교류원은 지속적으로 학생들의 국제적인 역량 강화와 경쟁력 상승에 전념하고 있습니다. 혁신적인 교육 환경과 헌신적인 교직원들의 결합으로, 영진전문대학교는 해외 취업 부문에서 전국 1위를 차지하였습니다.",
  icons: {
    icon: "/images/yeungjinLogoOpenGraph.png",
  },
  openGraph: {
    url: "https://oic.yju.ac.kr",
    type: "website",
    title: "국제교류원 - 영진전문대",
    description:
      "국제교류원은 지속적으로 학생들의 국제적인 역량 강화와 경쟁력 상승에 전념하고 있습니다. 혁신적인 교육 환경과 헌신적인 교직원들의 결합으로, 영진전문대학교는 해외 취업 부문에서 전국 1위를 차지하였습니다.",
    images: [
      {
        url: "https://oic.yju.ac.kr/images/yeungjinLogoOpenGraph.png",
        width: "1200",
        height: "630",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:ml-40 dark:bg-white dark:text-black">
      <SideMenu />
      <HamburgerMenuCompo/>
      {children}
    </div>
  );
}
