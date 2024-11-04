import "@/app/global.css"; // Import your global CSS
import { Metadata } from "next";
import { SessionProvider } from 'next-auth/react'; // NextAuth session provider
import { PropsWithChildren } from 'react'; // Props type for children
import Header from "./components/Header"; // Import your Header component
import Sidebar from "./components/Sidebar"; // Import your Sidebar component

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#00003c] text-white min-h-screen">
        <SessionProvider> {/* SessionProvider wraps the app to manage authentication state */}
          {/* Header */}
          <Header />
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar on the left */}
            <Sidebar activities={[]} /> {/* Assuming activities will be passed or fetched later */}
            {/* Main content area */}
            <main className="flex-grow p-6">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
