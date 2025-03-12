import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
    title: string;
    description: string;
    time: string;
    icon: string;
    link: string;
}

export function FeatureCard({ title, description, time, icon, link }: FeatureCardProps) {
    return (
        <Link href={link} className="block h-full transition-transform hover:-translate-y-1">
            <div className="bg-white dark:bg-gray-800 h-full rounded-xl shadow-md hover:shadow-lg p-6 transition-all">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Image src={icon} alt={title} width={32} height={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
                <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        처리 시간: {time}
                    </div>
                </div>
            </div>
        </Link>
    );
}