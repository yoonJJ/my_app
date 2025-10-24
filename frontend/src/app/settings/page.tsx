"use client";

import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";

export default function Settings() {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [coupleInfo, setCoupleInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCoupleInfo();
  }, []);

  const loadCoupleInfo = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/couple/info", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        setCoupleInfo(data);
        if (data.startDate) {
          setStartDate(data.startDate);
        }
      }
    } catch (error) {
      console.error("커플 정보 조회 실패:", error);
    }
  };

  const handleDateEdit = () => {
    setIsEditingDate(true);
  };

  const handleDateSave = async () => {
    if (!startDate) {
      alert("날짜를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8081/api/couple/set-date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ date: startDate })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("기념일이 수정되었습니다!");
          setIsEditingDate(false);
          // localStorage 업데이트
          localStorage.setItem("coupleStartDate", startDate);
          // 페이지 새로고침
          window.location.reload();
        } else {
          alert(data.message || "날짜 수정에 실패했습니다.");
        }
      } else {
        alert("날짜 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("날짜 수정 실패:", error);
      alert("날짜 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateCancel = () => {
    setIsEditingDate(false);
    // 원래 날짜로 복원
    if (coupleInfo?.startDate) {
      setStartDate(coupleInfo.startDate);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20 md:pb-6">
      <div className="px-4 py-6 md:px-8 md:py-8 pt-20 md:pt-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">설정</h1>
          
          {/* D-Day 날짜 수정 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">기념일 관리</h2>
            
            {!isEditingDate ? (
              <div className="flex items-center justify-between py-3">
                <div>
                  <span className="text-gray-700 block mb-1">만난 날</span>
                  <span className="text-gray-500 text-sm">{startDate || "설정되지 않음"}</span>
                </div>
                <button
                  onClick={handleDateEdit}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                >
                  수정
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    만난 날
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-gray-900"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDateCancel}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDateSave}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50"
                  >
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 기타 설정 */}
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

