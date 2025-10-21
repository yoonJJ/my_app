"use client";

import { useState } from "react";

export default function Photos() {
  const [photos] = useState([
    { id: 1, url: "/placeholder.jpg", caption: "첫 만남", date: "2024-01-15" },
    { id: 2, url: "/placeholder.jpg", caption: "데이트", date: "2024-02-14" },
    { id: 3, url: "/placeholder.jpg", caption: "여행", date: "2024-03-20" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">사진 기록</h1>
          <p className="text-gray-600">소중한 추억을 담은 사진들</p>
        </div>

        {/* Upload Button */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            + 사진 추가하기
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">이미지</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900 mb-1">{photo.caption}</p>
                <p className="text-sm text-gray-500">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 저장된 사진이 없습니다</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              첫 사진 추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
