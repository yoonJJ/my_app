import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              D-Day
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              홈
            </Link>
            <Link
              href="/photos"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              사진
            </Link>
            <Link
              href="/chat"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              채팅
            </Link>
            <Link
              href="/travels"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              여행
            </Link>
            <Link
              href="/timeline"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              타임라인
            </Link>
            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/signup"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                회원가입
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
