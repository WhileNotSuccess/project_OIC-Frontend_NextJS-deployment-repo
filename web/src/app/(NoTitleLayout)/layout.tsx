import SideMenu from "@/SideMenu";
import "./globals.css";
import HamburgerMenuCompo from "../(TitleLayout)/components/HamburgerMenuCompo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideMenu />
      <HamburgerMenuCompo/>
      {children}
    </div>
  );
}
