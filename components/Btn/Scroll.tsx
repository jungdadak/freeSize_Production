'use client';
import { ChevronsDown } from 'lucide-react';

interface GetstartedProps {
  /** 스크롤할 대상 요소의 ID. 없으면 한 화면 아래로 스크롤됩니다. */
  targetId?: string;
}

/**
 * Get Started 버튼 컴포넌트
 * @param targetId - 스크롤할 대상 요소의 ID (선택적)
 * @returns Get Started 버튼과 애니메이션 화살표를 포함한 컴포넌트
 */
export default function Getstarted({ targetId }: GetstartedProps) {
  const scrollToTarget = () => {
    if (targetId) {
      // ID가 제공된 경우 해당 요소로 스크롤
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      // ID가 없으면 기본값으로 한 화면 아래로 스크롤
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      onClick={scrollToTarget}
      className="mt-20 cursor-pointer flex flex-col items-center group"
    >
      <span className="text-orange-400 dark:text-orange-400 font-bold text-2xl md:text-4xl hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-300">
        Scroll
      </span>
      <ChevronsDown className=" w-12 h-12 text-orange-400 dark:text-orange-400 animate-bounce group-hover:text-orange-500 dark:group-hover:text-yellow-400" />
    </div>
  );
}
