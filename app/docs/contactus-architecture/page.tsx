// app/contact/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Freesize - Contact Us & Architecture',
    description: 'Freesize 개발 아키텍처 및 연락처 정보',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="text-blue-500 dark:text-blue-400 hover:underline mb-6 inline-block">
                ← 홈으로 돌아가기
            </Link>

            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Freesize Architecture & Contact</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">시스템 아키텍처</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Frontend</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Next.js (TypeScript)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    TailwindCSS
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Redux (상태 관리)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Redis (작업 상태 관리)
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Backend</h3>
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
                                    AWS S3 (이미지 저장)
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">AI Model</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    FastAPI
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    PyTorch
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Home Server 배포
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Tailscale (보안 네트워크)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">시스템 구성 상세</h3>
                    <div className="text-gray-700 dark:text-gray-300 space-y-4">
                        <p>
                            <strong>Frontend (Next.js):</strong> 사용자 인터페이스와 이미지 업로드를 처리하며, Redis를 활용하여
                            파일 이름과 S3 URL을 매핑하고 작업 상태를 관리합니다.
                        </p>
                        <p>
                            <strong>Backend (Spring):</strong> 큐 관리 및 로드 밸런싱을 담당하며, Tailscale을 통해 AI 모델(FastAPI)과
                            안전하게 통신합니다. EC2에 배포되어 있으며, 사용자 인증 및
                            데이터 관리를 위해 AWS RDS PostgreSQL을 사용합니다.
                        </p>
                        <p>
                            <strong>AI 서비스 (FastAPI):</strong> 홈서버에서 AI 모델을 로드하고 실행하여 이미지 처리 기능(Upscale,
                            Uncrop, Square)을 제공합니다.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-white">API 구성</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">API</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">기능</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">처리 시간</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">Upscale</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">이미지 해상도 향상 (x1, x2, x4 옵션)</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">약 15초</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">Uncrop</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">이미지를 1:2 또는 2:1 비율로 확장</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">약 25~40초</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">Square</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">이미지를 정사각형으로 확장</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">약 25~40초</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">개발팀</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-3 overflow-hidden">
                                {/* 개발자 프로필 이미지 */}
                                <Image
                                    src="/images/developers/dev1.jpg"
                                    alt="개발자 1"
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">개발자 1</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Frontend & Backend</p>
                        </div>
                        <div className="flex justify-center space-x-3">
                            <a href="https://github.com/developer1" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/developer1" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-3 overflow-hidden">
                                {/* 개발자 프로필 이미지 */}
                                <Image
                                    src="/images/developers/dev2.jpg"
                                    alt="개발자 2"
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">개발자 2</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Backend & DevOps</p>
                        </div>
                        <div className="flex justify-center space-x-3">
                            <a href="https://github.com/developer2" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/developer2" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-3 overflow-hidden">
                                {/* 개발자 프로필 이미지 */}
                                <Image
                                    src="/images/developers/dev3.jpg"
                                    alt="개발자 3"
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">개발자 3</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">AI Engineer</p>
                        </div>
                        <div className="flex justify-center space-x-3">
                            <a href="https://github.com/developer3" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/developer3" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">문의하기</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">연락처</h3>
                            <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:freesize@gmail.com" className="hover:text-blue-500 dark:hover:text-blue-400">freesize@gmail.com</a>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <a href="https://www.linkedin.com/company/freesize" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400">linkedin.com/company/freesize</a>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <a href="https://github.com/freesize" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400">github.com/freesize</a>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">피드백 보내기</h3>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">이름</label>
                                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">이메일</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">메시지</label>
                                    <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"></textarea>
                                </div>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">보내기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}