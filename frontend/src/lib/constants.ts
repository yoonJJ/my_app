// 공통 상수 및 설정
export const APP_CONFIG = {
  name: "우리의 하루",
  description: "커플 D-Day 및 추억 아카이브 앱",
  colors: {
    primary: "pink",
    secondary: "purple",
    accent: "blue",
  },
} as const;

// 메뉴 아이템 타입 정의
export interface MenuItem {
  href: string;
  label: string;
  icon: string;
  color: string;
}

// 공통 메뉴 아이템 데이터
export const MENU_ITEMS: MenuItem[] = [
  { href: '/', label: '홈', icon: 'home', color: 'pink' },
  { href: '/photos', label: '사진', icon: 'photos', color: 'blue' },
  { href: '/chat', label: '채팅', icon: 'chat', color: 'green' },
  { href: '/travels', label: '여행', icon: 'travel', color: 'purple' },
  { href: '/timeline', label: '타임라인', icon: 'timeline', color: 'orange' },
];

// 아이콘 SVG 경로 (문자열로 저장)
export const ICON_PATHS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  photos: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  travel: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  timeline: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  heart: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
  close: "M6 18L18 6M6 6l12 12",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
} as const;

// 아이콘 경로 가져오기 함수
export const getIconPath = (iconName: keyof typeof ICON_PATHS) => ICON_PATHS[iconName];

export const getMenuItemClasses = (item: MenuItem, isActive: boolean) => {
  const baseClasses = "flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors";
  
  if (isActive) {
    return `${baseClasses} bg-${item.color}-100 text-${item.color}-600`;
  }
  
  return `${baseClasses} text-gray-700 bg-gray-50 hover:bg-${item.color}-50 hover:text-${item.color}-600`;
};

// D-Day 계산 함수
export const calculateDays = (date: string): number => {
  const start = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
