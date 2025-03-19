"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Folder from "@/assets/icons/folder.svg";
import WatchLater from "@/assets/icons/clockfull.svg";
import Star from "@/assets/icons/starfull.svg";
import { useState } from "react";
import Activites from "./Activities";

export default function SideNav() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-col bg-tealDark p-0 ${expanded ? "w-64" : "w-20"} h-full`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex flex-col pt-10 px-5 nav-page-links mt-0 text-nowrap">
        <div className="flex flex-row justify-start py-4">
          <Link href="/" className="flex flex-row space-x-2 text-left text-lg">
            <Image
              src={Folder.src}
              alt="Home Page Icon"
              width={30}
              height={30}
            />
            {(expanded) && <span>Home</span>}
          </Link>
        </div>
        <div className="flex flex-row justify-start pl-0 py-4">
          <Link href="/favorites" className="flex flex-row space-x-2 text-left text-lg">
            <Image src={Star.src} alt="Home Page Icon" width={30} height={30} />
            {(expanded) && <span>Favorites</span>}
          </Link>
        </div>
        <div className="flex flex-row justify-start pl-0 py-4">
          <Link href="/watch-later" className="flex flex-row space-x-2 text-left text-lg">
            <Image
              src={WatchLater.src}
              alt="Home Page Icon"
              width={30}
              height={30}
            />
            {(expanded) && <span>Watch Later</span>}
          </Link>
        </div>
      </div>

      {(expanded) && <div className="x-3 bg-teal rounded-2xl flex p-2 h-screen text-wrap justify-center text-center items-start"><Activites /></div>}

    </div>
  );
}
