"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [days, setDays] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 날짜 불러오기
    const savedDate = localStorage.getItem("coupleStartDate");
    if (savedDate) {
      calculateDays(savedDate);
      setIsConnected(true);
    }
  }, []);

  const calculateDays = (date: string) => {
    const start = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setDays(diffDays);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isConnected && days !== null ? (
          /* D-Day Display */
          <div className="text-center mb-12">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20">
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                  우리의 이야기
                </div>
                <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tight">
                  D+{days}
                </h1>
                <p className="text-xl text-gray-600 font-light">
                  함께한 소중한 시간
                </p>
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - Math.min(days / 365, 1))}`}
                    className="text-pink-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-pink-500">{Math.round((days / 365) * 100)}%</span>
                </div>
              </div>
              
              <p className="text-gray-500 font-medium">오늘도 사랑하는 하루</p>
            </div>
          </div>
        ) : (
          /* Not Connected State */
          <div className="text-center mb-12">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                커플과 연결하세요
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                로그인 후 커플을 연결하고 만난 날짜를 설정하면<br />
                매일 사랑한 날짜를 확인할 수 있어요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  로그인하기
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-gray-700 bg-white border border-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  회원가입하기
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/photos"
            className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">사진</p>
          </a>
          
          <a
            href="/chat"
            className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">채팅</p>
          </a>
          
          <a
            href="/travels"
            className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">여행</p>
          </a>
          
          <a
            href="/timeline"
            className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">타임라인</p>
          </a>
        </div>
      </div>
    </div>
  );
}
