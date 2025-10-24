"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS, getIconPath, ICON_PATHS } from "@/lib/constants";

export default function BottomNavigation() {
  const pathname = usePathname();

  // BottomNavigation용 메뉴 아이템 (설정 추가)
  const bottomMenuItems = [
    { href: '/', label: '홈', icon: 'home', color: 'pink' },
    { href: '/photos', label: '사진', icon: 'photos', color: 'blue' },
    { href: '/chat', label: '채팅', icon: 'chat', color: 'green' },
    { href: '/timeline', label: '타임라인', icon: 'timeline', color: 'orange' },
    { href: '/settings', label: '설정', icon: 'settings', color: 'gray' },
  ];

  const getActiveClasses = (color: string) => {
    switch(color) {
      case 'pink': return 'text-pink-600 bg-pink-50';
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'green': return 'text-green-600 bg-green-50';
      case 'purple': return 'text-purple-600 bg-purple-50';
      case 'orange': return 'text-orange-600 bg-orange-50';
      case 'gray': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex items-center justify-around py-2">
        {bottomMenuItems.map((item) => {
          const isActive = pathname === item.href;
          const activeClasses = getActiveClasses(item.color);
          const textColor = isActive ? activeClasses.split(' ')[0] : 'text-gray-500';
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? activeClasses : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`w-6 h-6 flex items-center justify-center ${textColor}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={getIconPath(item.icon as keyof typeof ICON_PATHS)} 
                  />
                </svg>
              </div>
              <span className={`text-xs mt-1 font-medium ${textColor}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}