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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex items-center justify-around py-2">
        {bottomMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? `text-${item.color}-600 bg-${item.color}-50` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`w-6 h-6 flex items-center justify-center ${
                isActive ? `text-${item.color}-600` : 'text-gray-500'
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={getIconPath(item.icon as keyof typeof ICON_PATHS)} 
                  />
                </svg>
              </div>
              <span className={`text-xs mt-1 font-medium ${
                isActive ? `text-${item.color}-600` : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}