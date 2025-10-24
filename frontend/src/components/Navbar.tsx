"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS, APP_CONFIG, getIconPath, getMenuItemClasses, ICON_PATHS } from "@/lib/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // 사이드바 열릴 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // 채팅 페이지에서는 Navbar 숨기기
  if (pathname === '/chat') {
    return null;
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 backdrop-blur-md border-b border-pink-200/50 sticky top-0 z-50">
        <div className="px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900">{APP_CONFIG.name}</span>
            </Link>
            
            {/* Hamburger Menu Button (Desktop Only) */}
            <button
              onClick={toggleMenu}
              className="hidden md:block p-2 rounded-lg hover:bg-white/50 transition-colors"
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Desktop Only) */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="hidden md:block fixed inset-0 bg-black/50 z-40"
            onClick={closeMenu}
          />
          
          {/* Sidebar */}
          <div className="hidden md:block fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">메뉴</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <nav className="space-y-2">
                  {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const getActiveClasses = () => {
                      switch(item.color) {
                        case 'pink': return 'bg-pink-50 text-pink-600';
                        case 'blue': return 'bg-blue-50 text-blue-600';
                        case 'green': return 'bg-green-50 text-green-600';
                        case 'purple': return 'bg-purple-50 text-purple-600';
                        case 'orange': return 'bg-orange-50 text-orange-600';
                        default: return 'bg-gray-50 text-gray-600';
                      }
                    };
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive ? getActiveClasses() : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={getIconPath(item.icon as keyof typeof ICON_PATHS)} 
                          />
                        </svg>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Auth Buttons */}
              <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  회원가입
                </Link>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}