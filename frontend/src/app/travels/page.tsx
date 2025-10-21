"use client";

import { useState } from "react";

export default function Travels() {
  const [travels] = useState([
    {
      id: 1,
      title: "제주도 여행",
      location: "제주시",
      date: "2024-03-15",
      memo: "첫 여행이었어요",
    },
    {
      id: 2,
      title: "서울 데이트",
      location: "강남구",
      date: "2024-04-20",
      memo: "맛집 탐방",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">여행 기록</h1>
          <p className="text-gray-600">함께한 여행과 데이트</p>
        </div>

        {/* Add Button */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            + 여행 추가하기
          </button>
        </div>

        {/* Travel List */}
        <div className="space-y-4">
          {travels.map((travel) => (
            <div key={travel.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{travel.title}</h3>
                <span className="text-sm text-gray-500">{travel.date}</span>
              </div>
              <p className="text-gray-600 mb-2">📍 {travel.location}</p>
              <p className="text-gray-700">{travel.memo}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {travels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 기록된 여행이 없습니다</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              첫 여행 기록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
