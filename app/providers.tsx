'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

// app/layout.tsx
import "@/app/global.css";
import { Metadata } from "next";
import { AuthProvider } from './providers';

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#00003c] text-white`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}