"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  
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

  if (isChecking) {
    return null;
  }

  const [messages] = useState([
    { id: 1, sender: "나", content: "안녕!", time: "10:30" },
    { id: 2, sender: "상대방", content: "안녕하세요!", time: "10:31" },
    { id: 3, sender: "나", content: "오늘 날씨 좋네요", time: "10:32" },
    { id: 4, sender: "상대방", content: "맞아요! 산책하기 좋은 날씨네요", time: "10:33" },
    { id: 5, sender: "나", content: "나중에 우리 외출할까?", time: "10:35" },
    { id: 6, sender: "상대방", content: "좋아요! 어디 갈까요?", time: "10:36" },
    { id: 7, sender: "나", content: "공원 어때? 공기 좋을 것 같아", time: "10:37" },
    { id: 8, sender: "상대방", content: "완벽해요! 🎉", time: "10:38" },
    { id: 9, sender: "나", content: "그럼 3시에 만날까?", time: "10:40" },
    { id: 10, sender: "상대방", content: "네! 정각에 만나요", time: "10:41" },
    { id: 11, sender: "나", content: "오케이! 기대돼 😊", time: "10:42" },
    { id: 12, sender: "상대방", content: "저도요! 보고 싶어요", time: "10:43" },
    { id: 13, sender: "나", content: "나도 보고 싶어! 얼른 시간 되었으면", time: "10:45" },
    { id: 14, sender: "상대방", content: "힘내요! 조금만 기다리면 돼요", time: "10:46" },
    { id: 15, sender: "나", content: "좋아, 그럼 나중에 봐!", time: "10:48" },
    { id: 16, sender: "상대방", content: "네! 나중에 봐요! 💕", time: "10:49" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // TODO: 메시지 전송 로직
      console.log("Sending:", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">채팅</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "나" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.sender === "나"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-white/80 backdrop-blur-sm border border-white/20 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === "나" ? "text-blue-100" : "text-gray-500"}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input - Fixed */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-4 py-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-lg"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
