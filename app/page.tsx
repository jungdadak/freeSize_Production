import Getstarted from '@/components/Btn/GetStarted';
import Hero from '@/components/HeroSection/Hero';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import ProcessSection from '@/components/HeroSection/ProcessSection';

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* 배경 이미지 – 그대로 유지 */}
      <Image
        src="/bgcat.webp"
        alt="Background Cat"
        priority
        className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
        width={2560}
        height={1440}
        sizes="100vw"
      />
      {/* Hero 섹션 */}
      <Hero>
        <main className="mt-24 md:ml-10 p-8 relative">
          <div className="absolute inset-0 bg-black/40 blur-xl rounded-xl -z-10" />

          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            <span className="text-orange-400 font-medium text-sm md:text-base">
              AI-Powered Image Enhancement
            </span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg text-center">
            Transform Your Images
            <br className="hidden md:block" />
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 block mt-2 md:mt-4">
              with AI Magic
            </span>
          </h1>

          <div className="mt-9 md:mt-10 flex items-center justify-center gap-2">
            <span className="text-lg sm:text-xl md:text-2xl text-gray-300">
              Completely
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">
              Free
            </span>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col items-center gap-6 text-center">
            <p className="text-xl md:text-2xl text-gray-100 font-medium">
              Having trouble preparing your{' '}
              <span className="text-orange-300 font-bold text-2xl md:text-3xl">
                LORA
              </span>{' '}
              training images?
            </p>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Our AI-powered tools handle everything - from smart upscaling to
              perfect uncropping.{' '}
              <span className="text-yellow-300 font-semibold">
                Get your training dataset ready in minutes
              </span>
              , not hours.
            </p>
          </div>
          <Getstarted />
        </main>
      </Hero>

      <Hero alignment="start">
        <ProcessSection />
      </Hero>
      {/* 추가 콘텐츠 – 스크롤이 가능한 충분한 높이 제공 */}
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-4xl text-gray-800 dark:text-gray-200">
          More Content Here
        </h2>
      </div>
    </div>
  );
}
