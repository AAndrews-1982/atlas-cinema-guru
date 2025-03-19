// Top links for side bar
"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Folder from "@/assets/icons/folder.svg";
import Image from "next/image";

export default function NavLinks() {
  return (
    <Link
      href="/ui/home"
      className={clsx(
        " hidden h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex hover:bg-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3"
      )}
    >
        <Image src={Folder.src} alt="Home Page Icon" width={25} height={25}/>
      <p className="hidden md:block">Home</p>
    </Link>
  );
}
