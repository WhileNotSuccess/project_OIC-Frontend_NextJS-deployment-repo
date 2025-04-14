import SideMenu from "@/SideMenu";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="fixed top-0 left-0 z-50">
          <SideMenu />
        </div>

        <div className="pl-40">
          {children}
        </div>
      </body>
    </html>
  );
}
