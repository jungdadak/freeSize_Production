// components/Pannel/InteractivePannel.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '../FileUpload/FileUpload';
import FilePreview from '../FileUpload/FilePreview';
import { useAppSelector } from '@/lib/redux/hooks';

export default function TestPannel() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const file = useAppSelector((state) => state.file.file);
  useEffect(() => {
    // 마운트 후 애니메이션을 위해 상태를 변경
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // 슬라이드 아웃 애니메이션을 위해 상태를 false로 변경
    setIsVisible(false);
    // 애니메이션 지속시간(500ms) 후 URL 쿼리 파라미터를 false로 변경하여 리디렉션
    setTimeout(() => {
      // showPanel 파라미터를 false로 세팅한 URL로 이동
      router.push(window.location.pathname + '?showPanel=false');
    }, 500);
  };

  return (
    <div
      className={`fixed right-8 top-32 bottom-12 
      w-[calc(50% - 2rem)]
      rounded-2xl 
      bg-white/90 dark:bg-black
      border-2 border-orange-400/50 dark:border-orange-500/50
      shadow-[0_0_40px_rgba(0,0,0,0.1)] 
      overflow-y-auto 
      transform transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* 전체 컨테이너에 여백 추가 */}
      <div className="p-8 md:p-10 h-full flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 
            w-10 h-10 flex items-center justify-center 
            rounded-full bg-orange-100 dark:bg-orange-900/30
            text-orange-600 dark:text-orange-400 
            hover:bg-orange-200 dark:hover:bg-orange-800/40 
            transition-colors duration-200
            border-2 border-orange-200 dark:border-orange-800/50"
        >
          <span className="text-2xl font-medium">×</span>
        </button>

        {/* 헤더 영역 */}
        <div className="mb-8 border-b-2 border-orange-200 dark:border-orange-800/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-500 w-2 h-2 rounded-full"></span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-orange-200">
              Image Enhancement
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-5">
            Transform your images with our AI-powered tools
          </p>
        </div>

        <div className="max-w-xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
            이미지를 끌어오거나 추가
          </h1>
          {file ? <FilePreview /> : <FileUpload />} {/* ✅ 중복 렌더링 방지 */}
        </div>
      </div>
    </div>
  );
}
