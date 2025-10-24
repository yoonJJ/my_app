"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPhoto() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    caption: "",
    date: new Date().toISOString().split('T')[0],
    time: "",
    location: "",
    note: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 사진 업로드 로직 구현
    console.log("사진 추가:", formData);
    alert("사진이 추가되었습니다!");
    router.push("/photos");
  };

  const handleCancel = () => {
    router.push("/photos");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">사진 추가하기</h1>
          <p className="text-gray-600 text-sm">소중한 순간을 기록해보세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 사진 업로드 영역 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              사진 선택
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-pink-400 transition-colors cursor-pointer">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-gray-600 mb-2">사진을 선택하거나 드래그하세요</p>
              <p className="text-sm text-gray-400">최대 10장까지 업로드 가능</p>
            </div>
          </div>

          {/* 제목 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label htmlFor="caption" className="block text-sm font-semibold text-gray-700 mb-3">
              제목
            </label>
            <input
              type="text"
              id="caption"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="예: 첫 만남, 데이트, 여행"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-gray-900 placeholder:text-gray-400"
              maxLength={50}
            />
          </div>

          {/* 날짜 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-3">
              날짜
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-gray-900"
            />
          </div>

          {/* 시간 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-3">
              시간 (선택사항)
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-gray-900"
            />
          </div>

          {/* 장소 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
              장소 (선택사항)
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="예: 강남역, 제주도"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-gray-900 placeholder:text-gray-400"
              maxLength={100}
            />
          </div>

          {/* 메모 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-3">
              메모 (선택사항)
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="이 순간에 대한 특별한 메모를 남겨보세요..."
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-gray-900 placeholder:text-gray-400 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-400 mt-2 text-right">
              {formData.note.length}/500
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

