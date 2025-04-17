import SideMenu from "@/SideMenu";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideMenu />
      {children}
    </div>
  );
}
