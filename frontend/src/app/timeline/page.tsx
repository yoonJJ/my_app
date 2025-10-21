"use client";

import { useState } from "react";

export default function Timeline() {
  const [events] = useState([
    { id: 1, type: "photo", title: "첫 만남", date: "2024-01-15", content: "사진 1장" },
    { id: 2, type: "chat", title: "대화", date: "2024-01-16", content: "안녕하세요!" },
    { id: 3, type: "travel", title: "제주도 여행", date: "2024-03-15", content: "첫 여행" },
    { id: 4, type: "photo", title: "데이트", date: "2024-04-20", content: "사진 3장" },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return "📷";
      case "chat":
        return "💬";
      case "travel":
        return "✈️";
      default:
        return "📅";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "photo":
        return "bg-blue-100 text-blue-600";
      case "chat":
        return "bg-green-100 text-green-600";
      case "travel":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">타임라인</h1>
          <p className="text-gray-600">함께한 모든 순간들</p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getTypeColor(event.type)}`}>
                  {getTypeIcon(event.type)}
                </div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600">{event.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 기록이 없습니다</p>
            <p className="text-sm text-gray-400">사진, 채팅, 여행을 기록해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
