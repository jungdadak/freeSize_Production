import Link from 'next/link';
import CompactPannel from "@/components/Pannel/CompactPannel";

export const metadata = {
    title: 'Upscale - Freesize',
    description: '이미지 비율을 유지하며 해상도를 향상시키는 AI 기반 Upscale 기능',
};

export default function UpscalePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                ← 홈으로 돌아가기
            </Link>

            <h1 className="text-3xl font-bold mb-6">Upscale</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <p className="mb-4">
                        Upscale 기능은 이미지의 비율을 유지하면서 해상도를 향상시켜줍니다. x1, x2, x4 옵션을 제공하며,
                        기본적으로 x4 해상도로 향상시킨 후 다운사이징하는 로직을 사용하여 선명도를 개선합니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>원본 이미지의 비율을 유지합니다.</li>
                        <li>x1 옵션만 적용해도 선명도 효과가 있습니다.</li>
                        <li>처리 시간: 약 15초</li>
                    </ul>
                    <p className="font-semibold">결과 확인:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>두 이미지를 겹쳐두고 변경점 확인</li>
                        <li>확대 기능으로 세부 확인 가능</li>
                    </ul>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">이미지 업로드</h2>
                    <CompactPannel />
                </div>
            </div>
        </div>
    );
}