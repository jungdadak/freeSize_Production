import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Quickstart Guide - Freesize',
    description: 'Get started quickly with Freesize image preprocessing tools. Learn how to use Upscale, Uncrop, and Square features.',
    keywords: [
        'AI image enhancement',
        'LORA training',
        'image upscaling',
        'image uncropping',
        'square image',
        'AI upscale',
        'free image tools',
        'image preprocessing',
        'AI image processor',
        'stable diffusion training',
        'AI dataset preparation',
        'image transformation',
        'deep learning dataset',
        'neural network training images',
        'high resolution AI training',
        'LORA 모델 학습',
        '이미지 전처리',
        'AI 이미지 확대',
        '이미지 업스케일링',
        '안티크롭 이미지',
        '이미지 정사각형 변환',
        '머신러닝 이미지 데이터셋',
        '스테이블 디퓨전 트레이닝',
        '딥러닝 이미지 준비',
        '무료 AI 이미지 도구',
        '이미지 크기 조정',
        '고해상도 이미지 변환',
        'AI 이미지 학습 도구',
        '이미지 결함 수정',
        '신경망 학습 데이터셋'
    ],
    openGraph: {
        title: 'Quickstart Guide - Freesize',
        description: 'Get started quickly with Freesize image preprocessing tools',
        images: [
            {
                url: '/quickstart-og.png',
                width: 1200,
                height: 630,
                alt: 'Freesize Quickstart Guide',
            },
        ],
    }
};

export default function QuickstartLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* SEO 키워드 (화면에 표시되지 않지만 검색 엔진은 인식) */}
            <div className="sr-only">
                <h2>키워드</h2>
                <ul>
                    <li>AI image enhancement</li>
                    <li>LORA training</li>
                    <li>image upscaling</li>
                    <li>image uncropping</li>
                    <li>square image</li>
                    <li>LORA 모델 학습</li>
                    <li>이미지 전처리</li>
                    <li>AI 이미지 확대</li>
                    <li>이미지 업스케일링</li>
                    <li>안티크롭 이미지</li>
                    <li>이미지 정사각형 변환</li>
                    <li>머신러닝 이미지 데이터셋</li>
                    <li>스테이블 디퓨전 트레이닝</li>
                    <li>딥러닝 이미지 준비</li>
                    <li>무료 AI 이미지 도구</li>
                    <li>이미지 크기 조정</li>
                    <li>고해상도 이미지 변환</li>
                    <li>AI 이미지 학습 도구</li>
                    <li>이미지 결함 수정</li>
                    <li>신경망 학습 데이터셋</li>
                </ul>
            </div>

            <div className="bg-white/90 dark:bg-black/90 rounded-xl shadow-lg p-6 md:p-8" >
                <div className="flex flex-row items-center gap-1">
                    <Image src={'/sitDown.svg'} alt={'logo'} width={70} height={70} />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-orange-200 dark:border-orange-800 pb-4">
                    Quickstart Guide
                </h1></div>

                {children}
            </div>
        </div>
    );
}