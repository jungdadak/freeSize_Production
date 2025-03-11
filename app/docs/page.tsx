// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import CompactPannel from "@/components/Pannel/CompactPannel";
import {FeatureCard} from "@/components/FeatureCard/FeatureCard";

export const metadata = {
    title: 'Freesize - 이미지 전처리 서비스',
    description: 'LORA 모델 학습을 위한 이미지 전처리 서비스: Upscale, Uncrop, Square 기능을 제공합니다.',
};

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="mb-16">
                <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            LORA 모델 학습을 위한<br/>
                            <span className="text-blue-600 dark:text-blue-400">이미지 전처리 서비스</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Freesize는 이미지 해상도 향상, 확장, 비율 변경을 통해<br/>
                            더 나은 LORA 모델 학습 결과를 얻을 수 있도록 도와드립니다.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/docs/getting-started"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                시작하기
                            </Link>
                            <Link
                                href="/docs"
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                            >
                                문서 보기
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <CompactPannel />
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">주요 기능</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Upscale"
                        description="이미지 비율을 유지하며 x1, x2, x4 해상도 향상. 기본 x4 스케일링 후 다운사이징으로 선명도 개선."
                        time="약 15초"
                        icon="/icons/upscale.svg"
                        link="/features/upscale"
                    />
                    <FeatureCard
                        title="Uncrop"
                        description="이미지를 1:2 또는 2:1 비율로 확장하는 생성형 AI 서비스. 장/단변 기준으로 자연스럽게 확장."
                        time="약 25-40초"
                        icon="/icons/uncrop.svg"
                        link="/features/uncrop"
                    />
                    <FeatureCard
                        title="Square"
                        description="다양한 해상도에서 이미지를 정사각형으로 확장. 가로/세로 어느 방향이든 정사각형으로 변환."
                        time="약 25-40초"
                        icon="/icons/square.svg"
                        link="/features/square"
                    />
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">시스템 구성</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Frontend</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Next.js (TypeScript)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Redis (작업 상태 관리)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    AWS S3 (이미지 저장소)
                                </li>
                            </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Backend</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Spring Boot
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    AWS RDS (PostgreSQL)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Prisma (ORM)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    큐 관리 및 로드 밸런싱
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Service</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    FastAPI
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    홈서버 배포
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Tailscale (보안 네트워크)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    AI 모델 로드 및 처리
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/docs/contactus-architecture"
                            className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                        >
                            자세한 아키텍처 보기
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">결과 확인</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Upscale 결과</h3>
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                            {/* 업스케일 결과 이미지 여기에 */}
                            <div className="w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src="/images/example-upscale.jpg"
                                    alt="Upscale 결과 예시"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300">
                                두 이미지를 겹쳐 비교하고 변경점을 확인할 수 있습니다.
                            </p>
                            <div className="flex justify-end">
                                <Link
                                    href="/features/upscale"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    자세히 보기 →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Uncrop/Square 결과</h3>
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                            {/* 언크롭/스퀘어 결과 이미지 여기에 */}
                            <div className="w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src="/images/example-uncrop.jpg"
                                    alt="Uncrop 결과 예시"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300">
                                비교 보기, 원본만 보기, 결과만 보기 및 돋보기 기능을 제공합니다.
                            </p>
                            <div className="flex justify-end">
                                <Link
                                    href="/features/uncrop"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    자세히 보기 →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">지금 바로 시작해보세요</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        무료로 이미지 전처리 서비스를 테스트해보고, LORA 모델 학습에 활용하세요.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/?showPanel=true"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            시작하기
                        </Link>
                        <Link
                            href="/docs/contactus-architecture"
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                        >
                            문의하기
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}