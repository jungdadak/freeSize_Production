// components/HeroSection/index.tsx (서버 컴포넌트)
import HeroAnimation from './HeroAnimation';

/**
 * 히어로 섹션에서 seo의 혜택을 받기 위한 컴포넌트!
 */
export default function HeroSection() {
  return (
    <HeroAnimation>
      {/* SEO에 중요한 컨텐츠 */}
      <div className="mt-20 p-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Your Hero Title
        </h1>
        <p className="text-xl text-white/90 mt-4">
          Your important description for SEO
        </p>
      </div>
    </HeroAnimation>
  );
}
