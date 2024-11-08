<<<<<<< HEAD
=======
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ActivityFeed from './ActivityFeed';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: '/assets/folder-solid.svg', alt: 'Home' },
    { href: '/favorites', label: 'Favorites', icon: '/assets/star-solid.svg', alt: 'Favorites' },
    { href: '/watch-later', label: 'Watch Later', icon: '/assets/clock-solid.svg', alt: 'Watch Later' },
  ];

  return (
    <div
      className={`relative bg-teal transition-all duration-300 ${
        isExpanded ? 'md:w-64' : 'md:w-20'
      } w-full h-20 md:h-auto`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="flex flex-row md:flex-col py-0 md:py-10 md:space-y-6 px-5 h-full">
        {navItems.map(({ href, label, icon, alt }) => (
          <Link key={href} href={href} className="flex items-center w-full">
            <img src={icon} alt={alt} className="h-6 w-6" />
            {(isExpanded || isMobile) && (
              <span className="ml-3 text-white hover:text-blueLight transition duration-300 hover:scale-105">
                {label}
              </span>
            )}
          </Link>
        ))}
        {isExpanded && <ActivityFeed />}
      </div>
    </div>
  );
};

export default Dashboard;
>>>>>>> 25e2ed2 (still not able to load images)
