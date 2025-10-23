"use client";

import BottomNavigation from "@/components/BottomNavigation";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20 md:pb-6">
      <div className="px-4 py-6 md:px-8 md:py-8 pt-20 md:pt-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">설정</h1>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">알림 설정</span>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">다크 모드</span>
                <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">언어</span>
                <span className="text-gray-500">한국어</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700">버전</span>
                <span className="text-gray-500">1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}

