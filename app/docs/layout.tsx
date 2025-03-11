import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Freesize - 문서',
    description: 'Freesize 이미지 전처리 서비스 문서 및 가이드',
    keywords: ['문서', '가이드', 'LORA', '이미지 전처리', 'API'],
};

export default function DocsLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <div className="flex flex-col md:flex-row gap-8">
                {/* 사이드바 네비게이션 */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-8">
                        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
                            ← 홈으로 돌아가기
                        </Link>

                        <h2 className="text-xl font-bold mb-4">문서</h2>

                        <nav className="space-y-1">
                            <Link href="/docs" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                소개
                            </Link>
                            <Link href="/docs/getting-started" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                시작하기
                            </Link>

                            <div className="py-2">
                                <h3 className="px-3 font-medium text-gray-500 dark:text-gray-400">기능 가이드</h3>
                                <div className="mt-1 space-y-1 pl-4">
                                    <Link href="/docs/features/upscale" className="block py-1 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Upscale
                                    </Link>
                                    <Link href="/docs/features/uncrop" className="block py-1 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Uncrop
                                    </Link>
                                    <Link href="/docs/features/square" className="block py-1 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Square
                                    </Link>
                                </div>
                            </div>
                            <Link href="/docs/faq" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                FAQ
                            </Link>
                            <Link href="/docs/contactus-architecture" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                Contact Us & Architecture
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* 메인 콘텐츠 */}
                <main className="flex-1 min-w-0">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}