"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  userId: string;
  userName: string;
}

export default function Schedule() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    checkSession();
    // Mock data - will be replaced with actual API call
    setEvents([
      {
        id: 1,
        title: "첫 만남 기념일",
        date: "2025-10-05",
        time: "18:00",
        location: "강남 카페",
        description: "처음 만난 날을 기념해요 💕",
        userId: "user1",
        userName: "나",
      },
      {
        id: 2,
        title: "영화 관람",
        date: "2025-10-10",
        time: "20:00",
        location: "CGV 압구정",
        description: "새 영화 보러 가요",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 3,
        title: "맛집 탐방",
        date: "2025-10-15",
        time: "19:00",
        location: "남산 타워 근처",
        description: "가을 특별한 식사",
        userId: "user1",
        userName: "나",
      },
      {
        id: 4,
        title: "해외 여행",
        date: "2025-10-18",
        time: "10:00",
        location: "인천공항",
        description: "3박 4일 일본 여행",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 5,
        title: "백화점 쇼핑",
        date: "2025-10-20",
        time: "14:00",
        location: "명동",
        description: "신상품 쇼핑",
        userId: "user1",
        userName: "나",
      },
      {
        id: 6,
        title: "100일 기념",
        date: "2025-10-25",
        time: "17:00",
        location: "호텔 레스토랑",
        description: "100일 기념 특별한 날",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 7,
        title: "트래킹",
        date: "2025-10-28",
        time: "09:00",
        location: "북한산",
        description: "가을 산행",
        userId: "user1",
        userName: "나",
      },
      {
        id: 8,
        title: "카페 투어",
        date: "2025-11-01",
        time: "13:00",
        location: "성수동",
        description: "핫플레이스 탐방",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 9,
        title: "집들이",
        date: "2025-11-05",
        time: "18:00",
        location: "우리 집",
        description: "친구들 초대해서 파티",
        userId: "user1",
        userName: "나",
      },
      {
        id: 10,
        title: "볼링",
        date: "2025-11-08",
        time: "19:00",
        location: "송파구",
        description: "운동 겸 재미있게",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 11,
        title: "축제 참여",
        date: "2025-11-12",
        time: "12:00",
        location: "강원도",
        description: "가을 축제 구경",
        userId: "user1",
        userName: "나",
      },
      {
        id: 12,
        title: "요리 배우기",
        date: "2025-11-15",
        time: "16:00",
        location: "요리학원",
        description: "이탈리안 파스타 만들기",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 13,
        title: "데이트",
        date: "2025-11-20",
        time: "18:00",
        location: "한강공원",
        description: "첫 만남 장소 재방문",
        userId: "user1",
        userName: "나",
      },
      {
        id: 14,
        title: "온천 여행",
        date: "2025-11-25",
        time: "10:00",
        location: "부산",
        description: "2박 3일 힐링 여행",
        userId: "user2",
        userName: "상대방",
      },
      {
        id: 15,
        title: "전시회 관람",
        date: "2025-11-30",
        time: "14:00",
        location: "국립현대미술관",
        description: "미술 감상",
        userId: "user1",
        userName: "나",
      },
    ]);
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/session", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        if (!data.authenticated) {
          router.push("/login");
          return;
        }
      } else {
        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
      router.push("/login");
      return;
    }
    setIsChecking(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter(event => event.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEventToAdd: ScheduleEvent = {
      id: events.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      description: newEvent.description,
      userId: "user1",
      userName: "나",
    };
    setEvents([...events, newEventToAdd]);
    setNewEvent({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      description: "",
    });
    setShowAddModal(false);
  };

  const getDateStatus = (day: number | null, date: Date) => {
    if (!day) return "";
    const fullDate = new Date(date.getFullYear(), date.getMonth(), day);
    const eventsForDay = getEventsForDate(fullDate);
    return eventsForDay.length > 0 ? "has-events" : "";
  };

  const formatMonthYear = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const formatWeekday = (index: number) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[index];
  };

  if (isChecking) {
    return null;
  }

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = getEventsForDate(selectedDate);
  const today = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">일정 관리</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100 transition-colors"
          >
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{formatMonthYear(currentDate)}</h2>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100 transition-colors"
          >
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 py-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <div key={dayIndex} className="text-center text-sm font-semibold text-gray-600 py-2">
              {formatWeekday(dayIndex)}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="aspect-square" />;
            }

            const dateForDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday =
              dateForDay.getDate() === today.getDate() &&
              dateForDay.getMonth() === today.getMonth() &&
              dateForDay.getFullYear() === today.getFullYear();
            const isSelected =
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentDate.getMonth() &&
              selectedDate.getFullYear() === currentDate.getFullYear();
            const eventsForDay = getEventsForDate(dateForDay);
            const hasEvents = eventsForDay.length > 0;

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedDate(dateForDay);
                }}
                className={`aspect-square p-1 rounded-lg transition-all ${
                  isToday
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold"
                    : isSelected
                    ? "bg-purple-100 text-purple-900 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-sm">{day}</span>
                  {hasEvents && (
                    <div className="flex gap-0.5 mt-1">
                      {eventsForDay.map((event, idx) => (
                        <div
                          key={event.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            event.userName === "나" ? "bg-purple-300" : "bg-pink-300"
                          }`}
                          title={event.title}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      <div className="px-4 pb-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정
            </h3>
            <span className="text-sm text-gray-500">
              {selectedDateEvents.length}개의 일정
            </span>
          </div>

          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>이날 일정이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-xl ${
                    event.userName === "나"
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500"
                      : "bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          event.userName === "나"
                            ? "bg-purple-200 text-purple-800"
                            : "bg-pink-200 text-pink-800"
                        }`}>
                          {event.userName}
                        </span>
                      </div>
                      {event.time && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">새 일정 추가</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">일정 제목</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="예: 영화 관람"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">날짜</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">시간 (선택)</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">장소 (선택)</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="예: 영화관"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상세 설명 (선택)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="일정에 대한 설명을 입력하세요"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  추가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

