import "@/app/global.css";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import SideNav from "@/components/SideNav";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-screen">
      <body className={`antialiased bg-[#00003c] text-white`}>
          <div className="flex h-screen flex-col font-poppins ">
          <NavBar />
            <div className="top-0 left-0 bottom-0 z-40 w-full h-full flex flex-row pl-0 ml-0">
                <SideNav />
                <div className="w-full">
                    <main className="ui p-6">{children}</main>
                </div>
            </div>
          </div>
      </body>
    </html>
  );
}
