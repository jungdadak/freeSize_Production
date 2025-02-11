'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(true);

  // 현재 테마 상태 확인
  useEffect(() => {
    // body의 클래스를 확인해서 현재 테마 상태 가져오기
    const bodyClasses = document.body.className;
    const currentIsDark = bodyClasses.includes('dark');
    setIsDark(currentIsDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    // body의 클래스 직접 수정
    const bodyClasses = document.body.className.split(' ');
    if (newMode) {
      // 다크모드로 변경
      if (!bodyClasses.includes('dark')) {
        document.body.className = [...bodyClasses, 'dark'].join(' ');
      }
      document.cookie = 'mode=; path=/; max-age=-1'; // 쿠키 삭제
    } else {
      // 라이트모드로 변경
      document.body.className = bodyClasses
        .filter((c) => c !== 'dark')
        .join(' ');
      document.cookie = 'mode=light; path=/; max-age=31536000';
    }
  };

  return (
    <div className="flex items-center gap-2 transition-colors text-white">
      <span className="text-md font-bold">Theme</span>
      <button
        onClick={toggleTheme}
        className={`
          relative flex items-center h-4 w-8 rounded-full transition-colors duration-200
          ${isDark ? 'bg-yellow-300' : 'bg-blue-100'}
        `}
      >
        <div
          className={`
            absolute flex items-center justify-center h-4 w-4
            rounded-full transition-transform duration-200
            ${
              isDark
                ? 'translate-x-4 bg-gray-900'
                : 'translate-x-0 bg-yellow-400'
            }
          `}
        >
          {isDark ? (
            <Moon className="h-2 w-2 text-yellow-400" />
          ) : (
            <Sun className="h-2 w-2 text-white font-bold" />
          )}
        </div>
      </button>
    </div>
  );
}
