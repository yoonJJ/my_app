"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function PhotoDetail() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<{name: string, email: string, matched: boolean, inviteCode: string} | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  // 임시 데이터
  const [photo, setPhoto] = useState({
    id: params.id,
    caption: "첫 만남",
    date: "2024-01-15",
    time: "15:30",
    location: "강남역",
    note: "처음 만난 날! 설레는 마음으로 만나서 너무 즐거웠어. 앞으로도 함께 좋은 추억 많이 만들자 💕",
    photos: [
      { id: 1, url: "/placeholder.jpg" },
      { id: 2, url: "/placeholder.jpg" },
      { id: 3, url: "/placeholder.jpg" },
    ]
  });

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

  const handleBack = () => {
    router.push("/photos");
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // TODO: 삭제 로직 구현
      alert("사진이 삭제되었습니다.");
      router.push("/photos");
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">사진 상세</h1>
          <button
            onClick={handleDelete}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* 사진 슬라이더 */}
        <div className="bg-white">
          <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
            {/* 임시 이미지 플레이스홀더 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-sm">사진 {photo.photos.length}장</p>
              </div>
            </div>

            {/* 이미지 인디케이터 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {photo.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="px-4 py-6 space-y-6">
          {/* 제목 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{photo.caption}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{photo.date}</span>
              </div>
              {photo.time && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{photo.time}</span>
                </div>
              )}
              {photo.location && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{photo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* 메모 */}
          {photo.note && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                메모
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{photo.note}</p>
            </div>
          )}

          {/* 사진 미리보기 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">사진 모음</h3>
            <div className="grid grid-cols-3 gap-2">
              {photo.photos.map((p) => (
                <div
                  key={p.id}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {user && user.matched && <BottomNavigation />}
    </div>
  );
}

