// app/page.tsx
import Image from 'next/image';
import MainContent from '@/components/HeroSection/MainContent';
import HeroIndex from '@/components/HeroSection/HeroIndex';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 배경 이미지 */}
      <Image
        src="/bgcat.webp"
        alt="Background Cat"
        priority
        className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
        width={2560}
        height={1440}
        sizes="100vw"
      />

      {/* 스크롤 시 사라지는 히어로 섹션 */}
      <HeroIndex />

      {/* 스크롤 시 올라오는 메인 콘텐츠 */}
      <MainContent />
    </div>
  );
}
