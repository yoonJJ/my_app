"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CoupleSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: 커플 연결, 2: 날짜 설정
  const [coupleCode, setCoupleCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 커플 코드로 연결하는 로직
    console.log("Connecting with code:", coupleCode);
    setIsConnected(true);
    setStep(2);
  };

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 만난 날짜 저장하는 로직
    localStorage.setItem("coupleStartDate", startDate);
    console.log("Start date saved:", startDate);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Step 1: 커플 연결 */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💑</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                커플 연결하기
              </h2>
              <p className="text-gray-600">
                파트너가 공유한 커플 코드를 입력하세요
              </p>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  커플 코드
                </label>
                <input
                  type="text"
                  value={coupleCode}
                  onChange={(e) => setCoupleCode(e.target.value)}
                  placeholder="예: ABC123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-center text-2xl font-mono tracking-widest"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                연결하기
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                아직 코드가 없나요?{" "}
                <button
                  onClick={() => {
                    // TODO: 새 커플 코드 생성
                    const newCode = "ABC123";
                    setCoupleCode(newCode);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  새 코드 생성하기
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: 날짜 설정 */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💕</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                만난 날짜 설정
              </h2>
              <p className="text-gray-600">
                언제부터 사랑하기 시작했나요?
              </p>
            </div>

            <form onSubmit={handleDateSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  만난 날짜
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                설정 완료
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
