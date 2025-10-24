"use client";

import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { calculateDays } from "@/lib/constants";

type CoupleInfo = {
  matched: boolean;
  needToSetDate: boolean;
  needToSetNickname: boolean;
  startDate: string | null;
  myNickname: string | null;
  partnerNickname: string | null;
  partnerName: string | null;
};

export default function Home() {
  const [days, setDays] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, matched: boolean, inviteCode: string} | null>(null);
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo | null>(null);

  useEffect(() => {
    // 세션 확인
    checkSession();
    
    const savedDate = localStorage.getItem("coupleStartDate");
    if (savedDate) {
      handleCalculateDays(savedDate);
      setIsConnected(true);
      setShowWelcome(false);
    } else {
      // 웰컴 애니메이션 시작
      setTimeout(() => setShowText(true), 1000);
      setTimeout(() => setShowButtons(true), 3000);
    }
  }, []);

  useEffect(() => {
    if (user && user.matched) {
      loadCoupleInfo();
    }
  }, [user]);

  useEffect(() => {
    if (coupleInfo && coupleInfo.matched && coupleInfo.startDate) {
      handleCalculateDays(coupleInfo.startDate);
    }
  }, [coupleInfo]);

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
            matched: data.matched || false,
            inviteCode: data.inviteCode || ''
          });
          localStorage.setItem("user", JSON.stringify({
            name: data.name,
            email: data.email,
            matched: data.matched || false,
            inviteCode: data.inviteCode || ''
          }));
        }
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
    }
  };

  const loadCoupleInfo = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/couple/info", {
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        setCoupleInfo(data);
      }
    } catch (error) {
      console.error("커플 정보 조회 실패:", error);
    }
  };

  const handleCalculateDays = (date: string) => {
    const diffDays = calculateDays(date);
    setDays(diffDays);
  };

  const handleMatchSuccess = () => {
    // 매칭 성공 후 페이지 새로고침
    window.location.reload();
  };

  // 웰컴 화면
  if (showWelcome && !isConnected && !user) {
    return (
      <>
        <style jsx global>{`
          nav { display: none !important; }
        `}</style>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
          {/* 배경 하트 애니메이션 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 text-6xl animate-pulse">💕</div>
            <div className="absolute top-40 right-20 text-8xl animate-bounce delay-1000">💖</div>
            <div className="absolute bottom-20 left-1/4 text-7xl animate-pulse delay-2000">💝</div>
            <div className="absolute bottom-40 right-1/3 text-6xl animate-bounce delay-500">💗</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl animate-pulse delay-1500">💕</div>
          </div>

          <div className="text-center px-4 max-w-md mx-auto">
            {/* 메인 텍스트 */}
            <div className={`transition-all duration-2000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 leading-relaxed">
                당신과 연인의<br />
                <span className="font-bold text-pink-500">
                  날짜는 언제인가요?
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                소중한 순간들을 함께 기록하고<br />
                사랑의 시간을 세어보세요
              </p>
            </div>

            {/* 버튼들 */}
            <div className={`transition-all duration-1000 delay-500 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-4">
                <a
                  href="/login"
                  className="block w-full py-4 text-white bg-pink-500 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300 text-lg"
                >
                  로그인하기
                </a>
                <a
                  href="/signup"
                  className="block w-full py-4 text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
                >
                  회원가입하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <div className="px-4 py-6 md:px-8 md:py-8 pt-20 md:pt-8">
        {/* 사용자 정보 표시 */}
        {user && (
          <div className="mb-4 text-right">
            <span className="text-sm text-gray-600">
              {user.name}님 환영합니다! 💕
            </span>
          </div>
        )}
        
        {user && user.matched && coupleInfo ? (
          coupleInfo.needToSetDate ? (
            <SetDateView onSuccess={handleMatchSuccess} />
          ) : coupleInfo.needToSetNickname ? (
            <SetNicknameView onSuccess={handleMatchSuccess} />
          ) : days !== null ? (
            <DdayDisplay days={days} />
          ) : (
            <div>로딩 중...</div>
          )
        ) : user && !user.matched ? (
          <NotMatchedState inviteCode={user.inviteCode} onMatchSuccess={handleMatchSuccess} />
        ) : (
          <NotConnectedState />
        )}
      </div>
      
      {/* 매칭된 경우에만 하단 네비게이션 표시 */}
      {user && user.matched && coupleInfo && !coupleInfo.needToSetDate && !coupleInfo.needToSetNickname && <BottomNavigation />}
    </div>
  );
}

// 기념일 설정 컴포넌트
function SetDateView({ onSuccess }: { onSuccess: () => void }) {
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!date) {
      setError("날짜를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/couple/set-date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ date }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("coupleStartDate", date);
        onSuccess();
      } else {
        setError(data.message || "날짜 설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("날짜 설정 실패:", error);
      setError("날짜 설정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 text-center md:max-w-2xl md:mx-auto">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center md:w-20 md:h-20">
          <svg className="w-8 h-8 text-white md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
          기념일을 설정해주세요
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed md:text-base">
          만난 날짜를 선택해주세요
        </p>
        
        <div className="mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-center text-lg font-medium text-gray-900"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 text-white bg-pink-500 rounded-2xl font-semibold shadow-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "설정 중..." : "기념일 설정하기"}
        </button>
      </div>
    </div>
  );
}

// 애칭 설정 컴포넌트
function SetNicknameView({ onSuccess }: { onSuccess: () => void }) {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setError("애칭을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/couple/set-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nickname }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.message || "애칭 설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("애칭 설정 실패:", error);
      setError("애칭 설정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 text-center md:max-w-2xl md:mx-auto">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center md:w-20 md:h-20">
          <svg className="w-8 h-8 text-white md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
          애칭을 설정해주세요
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed md:text-base">
          상대방을 부르는 애칭을 정해주세요
        </p>
        
        <div className="mb-6">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="예: 오빠, 내꺼, 사랑"
            maxLength={20}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-center text-lg font-medium text-gray-900 placeholder:text-gray-400"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 text-white bg-pink-500 rounded-2xl font-semibold shadow-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "설정 중..." : "애칭 설정하기"}
        </button>
      </div>
    </div>
  );
}

// D-Day 표시 컴포넌트
function DdayDisplay({ days }: { days: number }) {
  const [displayDays, setDisplayDays] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 페이드인 효과
    setIsVisible(true);
    
    // 숫자 카운트업 효과
    const duration = 2000; // 2초 동안 카운트업
    const steps = 60;
    const increment = days / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= days) {
        setDisplayDays(days);
        clearInterval(timer);
      } else {
        setDisplayDays(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [days]);

  return (
    <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 md:max-w-2xl md:mx-auto">
        <div className="flex flex-col items-center mb-6">
          {/* D-Day Circle */}
          <div className="relative w-40 h-40 mb-4 md:w-48 md:h-48">
            <svg className="w-40 h-40 md:w-48 md:h-48 transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - Math.min(displayDays / 365, 1))}`}
                className="text-pink-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-gray-900 md:text-5xl transition-all duration-100">D+{displayDays}</span>
              <span className="text-sm text-gray-500 font-medium md:text-base">일째</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600 font-medium mb-2 md:text-xl">우리가 사랑한 지</p>
            <p className="text-sm text-gray-500 md:text-base">오늘도 사랑하는 하루</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 매칭되지 않은 상태 컴포넌트
function NotMatchedState({ inviteCode, onMatchSuccess }: { inviteCode: string, onMatchSuccess: () => void }) {
  const [partnerCode, setPartnerCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    if (!partnerCode.trim()) {
      setError("상대방의 초대 코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/couple/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ inviteCode: partnerCode }),
      });

      const data = await response.json();

      if (data.success) {
        alert("매칭 성공!");
        onMatchSuccess();
      } else {
        setError(data.message || "매칭에 실패했습니다.");
      }
    } catch (error) {
      console.error("매칭 실패:", error);
      setError("매칭에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 text-center md:max-w-2xl md:mx-auto">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center md:w-20 md:h-20">
          <svg className="w-8 h-8 text-white md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
          커플과 연결하세요
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed md:text-base">
          상대방의 초대 코드를 입력하거나<br />
          본인의 초대 코드를 공유하세요
        </p>
        
        {/* 상대방 초대 코드 입력 */}
        <div className="mb-6">
          <input
            type="text"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value)}
            placeholder="상대방의 초대 코드 입력"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 text-center text-lg font-medium text-gray-900 placeholder:text-gray-400"
            maxLength={8}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* 매칭 버튼 */}
        <button
          onClick={handleMatch}
          disabled={isLoading}
          className="w-full py-4 text-white bg-pink-500 rounded-2xl font-semibold shadow-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? "매칭 중..." : "커플 연결하기"}
        </button>

        {/* 본인의 초대 코드 표시 */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">내 초대 코드</p>
          <div className="bg-gray-50 px-6 py-3 rounded-2xl inline-block">
            <span className="text-2xl font-bold text-gray-900 tracking-wider">
              {inviteCode || "생성 중..."}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            이 코드를 상대방에게 공유하세요
          </p>
        </div>
      </div>
    </div>
  );
}

// 연결되지 않은 상태 컴포넌트
function NotConnectedState() {
  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 text-center md:max-w-2xl md:mx-auto">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center md:w-20 md:h-20">
          <svg className="w-8 h-8 text-white md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
          커플과 연결하세요
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed md:text-base">
          로그인 후 커플을 연결하고<br />
          만난 날짜를 설정해보세요
        </p>
        <div className="space-y-3 md:flex md:space-y-0 md:space-x-4 md:justify-center">
          <a
            href="/login"
            className="block w-full py-4 text-white bg-blue-600 rounded-2xl font-semibold shadow-lg hover:bg-blue-700 text-center md:w-auto md:px-8"
          >
            로그인하기
          </a>
          <a
            href="/signup"
            className="block w-full py-4 text-gray-700 bg-white border border-gray-200 rounded-2xl font-semibold shadow-lg text-center md:w-auto md:px-8"
          >
            회원가입하기
          </a>
        </div>
      </div>
    </div>
  );
}
