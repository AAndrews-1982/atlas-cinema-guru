import { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import { FiHome, FiStar, FiClock } from 'react-icons/fi';


interface SidebarProps {
  activities: Activity[];
}

const Sidebar: FC<SidebarProps> = ({ activities }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <Link href="/"><a className="link"><FiHome /><span>{(isExpanded || isMobile) && 'Home'}</span></a></Link>
      <Link href="/favorites"><a className="link"><FiStar /><span>{(isExpanded || isMobile) && 'Favorites'}</span></a></Link>
      <Link href="/watch-later"><a className="link"><FiClock /><span>{(isExpanded || isMobile) && 'Watch Later'}</span></a></Link>
      {isExpanded && <ActivityFeed activities={activities} />}
    </aside>
  );
};

export default Sidebar;