import Scroll from '@/components/Btn/Scroll';
import Hero from '@/components/HeroSection/Hero';
import Image from 'next/image';
import {Sparkles} from 'lucide-react';
import ProcessSection from '@/components/HeroSection/ProcessSection';
import TestPannel from '@/components/Pannel/InteractivePannel';
import Link from 'next/link';

type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({searchParams}: PageProps) {
    const sp = await searchParams;
    const showPanel = sp.showPanel === 'true';

    return (
        <div className="min-h-screen text-center relative">
            {/* 배경 이미지 – 기존 디자인 그대로 */}
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
            <Hero alignment="start">
                <main className="w-full min-h-screen flex flex-col md:flex-row">
                    {/* 왼쪽 텍스트 섹션 */}
                    <div className="w-full md:w-1/2 p-8 md:p-8 flex flex-col items-center justify-center shrink-0">
                        {/* AI-Powered 배지 */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 mb-8">
                            <Sparkles className="w-5 h-5 text-orange-400"/>
                            <span className="text-orange-400 font-medium text-sm">
                AI-Powered Image Enhancement
              </span>
                        </div>

                        {/* 메인 제목 */}
                        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg text-center max-w-2xl">
                            Transform Your Images
                            <span
                                className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 block mt-4">
                with AI Magic
              </span>
                        </h1>

                        {/* Free 배지 */}
                        <div
                            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
                            <span className="text-xl text-gray-300">Completely</span>
                            <span className="text-3xl font-bold text-orange-400">Free</span>
                        </div>

                        {/* 설명 텍스트 */}
                        <div className="mt-12 text-center max-w-xl mx-auto">
                            <p className="text-2xl text-gray-100 font-medium mb-4">
                                Having trouble preparing your{' '}
                                <span className="text-orange-300 font-bold text-3xl">LORA</span>{' '}
                                training images?
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Our AI-powered tools handle everything - from smart upscaling to
                                perfect uncropping.{' '}
                                <span className="text-yellow-300 font-semibold">
                  Get your training dataset ready in minutes
                </span>
                                , not hours.
                            </p>

                            {/* 개선된 버튼 */}
                            <Link
                                href="?showPanel=true"
                                className="inline-flex items-center justify-center px-8 py-4
            bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700
            text-white text-lg font-semibold rounded-xl
            transform transition-all duration-200 
            hover:scale-105 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Try It Out
                            </Link>
                        </div>

                        {/* Scroll 버튼 */}
                        <div>
                            <Scroll/>
                        </div>
                    </div>

                    {/* 오른쪽 패널 섹션 */}
                    <div
                        className="w-full md:w-1/2 h-screen sticky top-0 overflow-y-auto flex items-center justify-center p-4">
                        <div className="w-full max-w-3xl mx-auto">
                            {showPanel && <TestPannel/>}
                        </div>
                    </div>
                </main>
            </Hero>

            <Hero alignment="start">
                <ProcessSection/>
            </Hero>

            <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <h2 className="text-4xl text-gray-800 dark:text-gray-200">
                    More Content Here
                </h2>
            </div>
        </div>
    );
}
