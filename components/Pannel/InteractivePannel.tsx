// components/Pannel/InteractivePannel.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '../FileUpload/FileUpload';
import FilePreview from '../FileUpload/FilePreview';
import { useAppSelector } from '@/lib/redux/hooks';

/**
 * 메인페이지 우측에 조건부로 랜더링 되는 테스트 패널 컴포넌트 입니다.
 * components/Btn/FileUpload 의 FilePreview, FileUpload를 조건부로 랜더링 합니다.
 */
export default function TestPannel() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // 리덕스 스토어에서 파일 데이터를 가져옵니다.
  const file = useAppSelector((state) => state.file.file);

  //---------------------<애니메이션 관련 로직 : 쿼리 파라미터를 사용합니다.>--------
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
      id="test"
      className={`w-full h-full
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
        <div className=" border-b-2 border-orange-200 dark:border-orange-800/50 ">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-500 w-2 h-2 rounded-full"></span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-orange-200">
              Test Your Image
            </h2>
          </div>
        </div>

        {/* --------- 이미지 업로드 상태(Redux fileSlice) 에서 파일 존재 유무에 따라 파일 미리보기나 업로드 상태랜더링합니다. */}
        <div className="flex items-center justify-between">
          <div className="w-full pt-3">
            {file ? <FilePreview /> : <FileUpload />}
          </div>
        </div>
      </div>
    </div>
  );
}
