"use client";

import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";

export default function Chat() {
  const [messages] = useState([
    { id: 1, sender: "나", content: "안녕!", time: "10:30" },
    { id: 2, sender: "상대방", content: "안녕하세요!", time: "10:31" },
    { id: 3, sender: "나", content: "오늘 날씨 좋네요", time: "10:32" },
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">채팅</h1>
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

      {/* Input */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-4 py-4">
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
      
      <BottomNavigation />
    </div>
  );
}
