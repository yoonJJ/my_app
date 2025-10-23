"use client";

import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { calculateDays } from "@/lib/constants";

export default function Home() {
  const [days, setDays] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    // 세션 확인
    checkSession();
    
    const savedDate = localStorage.getItem("coupleStartDate");
    if (savedDate) {
      handleCalculateDays(savedDate);
      setIsConnected(true);
      setShowWelcome(false);
    } else {
      // 웰컴 애니메이션 시작
      setTimeout(() => setShowText(true), 1000);
      setTimeout(() => setShowButtons(true), 3000);
    }
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/session", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser({ name: data.name, email: data.email });
          // 로컬 스토리지에도 저장 (기존 로직 유지)
          localStorage.setItem("user", JSON.stringify({
            name: data.name,
            email: data.email,
          }));
        }
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
    }
  };

  const handleCalculateDays = (date: string) => {
    const diffDays = calculateDays(date);
    setDays(diffDays);
  };

  // 웰컴 화면
  if (showWelcome && !isConnected) {
    return (
      <>
        <style jsx global>{`
          nav { display: none !important; }
        `}</style>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
          {/* 배경 하트 애니메이션 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 text-6xl animate-pulse">💕</div>
            <div className="absolute top-40 right-20 text-8xl animate-bounce delay-1000">💖</div>
            <div className="absolute bottom-20 left-1/4 text-7xl animate-pulse delay-2000">💝</div>
            <div className="absolute bottom-40 right-1/3 text-6xl animate-bounce delay-500">💗</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl animate-pulse delay-1500">💕</div>
          </div>

          <div className="text-center px-4 max-w-md mx-auto">
            {/* 메인 텍스트 */}
            <div className={`transition-all duration-2000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 leading-relaxed">
                당신과 연인의<br />
                <span className="font-bold text-pink-500">
                  날짜는 언제인가요?
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                소중한 순간들을 함께 기록하고<br />
                사랑의 시간을 세어보세요
              </p>
            </div>

            {/* 버튼들 */}
            <div className={`transition-all duration-1000 delay-500 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-4">
                <a
                  href="/login"
                  className="block w-full py-4 text-white bg-pink-500 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300 text-lg"
                >
                  로그인하기
                </a>
                <a
                  href="/signup"
                  className="block w-full py-4 text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
                >
                  회원가입하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <div className="px-4 py-6 md:px-8 md:py-8 pt-20 md:pt-8">
        {/* 사용자 정보 표시 */}
        {user && (
          <div className="mb-4 text-right">
            <span className="text-sm text-gray-600">
              {user.name}님 환영합니다! 💕
            </span>
          </div>
        )}
        
        {isConnected && days !== null ? (
          <DdayDisplay days={days} />
        ) : (
          <NotConnectedState />
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}

// D-Day 표시 컴포넌트
function DdayDisplay({ days }: { days: number }) {
  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 md:max-w-2xl md:mx-auto">
        <div className="flex flex-col items-center mb-6">
          {/* D-Day Circle */}
          <div className="relative w-40 h-40 mb-4 md:w-48 md:h-48">
            <svg className="w-40 h-40 md:w-48 md:h-48 transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - Math.min(days / 365, 1))}`}
                className="text-pink-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-gray-900 md:text-5xl">D+{days}</span>
              <span className="text-sm text-gray-500 font-medium md:text-base">일째</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600 font-medium mb-2 md:text-xl">우리가 사랑한 지</p>
            <p className="text-sm text-gray-500 md:text-base">오늘도 사랑하는 하루</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 연결되지 않은 상태 컴포넌트
function NotConnectedState() {
  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 text-center md:max-w-2xl md:mx-auto">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center md:w-20 md:h-20">
          <svg className="w-8 h-8 text-white md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
          커플과 연결하세요
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed md:text-base">
          로그인 후 커플을 연결하고<br />
          만난 날짜를 설정해보세요
        </p>
        <div className="space-y-3 md:flex md:space-y-0 md:space-x-4 md:justify-center">
          <a
            href="/login"
            className="block w-full py-4 text-white bg-blue-600 rounded-2xl font-semibold shadow-lg hover:bg-blue-700 text-center md:w-auto md:px-8"
          >
            로그인하기
          </a>
          <a
            href="/signup"
            className="block w-full py-4 text-gray-700 bg-white border border-gray-200 rounded-2xl font-semibold shadow-lg text-center md:w-auto md:px-8"
          >
            회원가입하기
          </a>
        </div>
      </div>
    </div>
  );
}