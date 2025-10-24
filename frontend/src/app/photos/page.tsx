"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function Photos() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, matched: boolean, inviteCode: string} | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  const [photos] = useState([
    { id: 1, url: "/placeholder.jpg", caption: "첫 만남", date: "2024-01-15" },
    { id: 2, url: "/placeholder.jpg", caption: "데이트", date: "2024-02-14" },
    { id: 3, url: "/placeholder.jpg", caption: "여행", date: "2024-03-20" },
  ]);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/session", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser({
            name: data.name,
            email: data.email,
            matched: data.matched,
            inviteCode: data.inviteCode
          });
          setIsChecking(false);
        } else {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
      router.push("/login");
    }
  };

  const handleAddPhoto = () => {
    router.push("/photos/add");
  };

  const handlePhotoClick = (id: number) => {
    router.push(`/photos/${id}`);
  };

  if (isChecking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">사진 기록</h1>
          <p className="text-gray-600 text-sm">소중한 추억을 담은 사진들</p>
        </div>

        {/* Upload Button */}
        <div className="mb-6">
          <button 
            onClick={handleAddPhoto}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            + 사진 추가하기
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              onClick={() => handlePhotoClick(photo.id)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">이미지</span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm mb-1">{photo.caption}</p>
                <p className="text-xs text-gray-500">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">아직 저장된 사진이 없습니다</p>
            <button 
              onClick={handleAddPhoto}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              첫 사진 추가하기
            </button>
          </div>
        )}
      </div>
      
      {user && user.matched && <BottomNavigation />}
    </div>
  );
}
