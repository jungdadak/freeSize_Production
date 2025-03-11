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
        <Link href={link}>
            <div className="bg-white rounded-lg shadow-md p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 mr-3">
                        <Image src={icon} alt={title} width={40} height={40} />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-sm text-gray-500">소요 시간: {time}</div>
            </div>
        </Link>
    );
}