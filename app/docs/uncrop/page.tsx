import Link from 'next/link';
import CompactPannel from "@/components/Pannel/CompactPannel";

export const metadata = {
    title: 'Uncrop - Freesize',
    description: '이미지를 1:2 또는 2:1 비율로 확장하는 생성형 AI 서비스',
};

export default function UncropPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                ← 홈으로 돌아가기
            </Link>

            <h1 className="text-3xl font-bold mb-6">Uncrop</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <p className="mb-4">
                        Uncrop은 이미지를 확장하는 생성형 AI 서비스입니다. 이미지를 1:2 또는 2:1 비율로
                        자연스럽게 확장하며, 이미지의 장변 또는 단변을 기준으로 비율에 따라 확장됩니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Square 기능을 먼저 적용한 후 생성됩니다.</li>
                        <li>이미지의 컨텍스트를 이해하고 자연스럽게 확장합니다.</li>
                        <li>처리 시간: 약 25-40초</li>
                    </ul>
                    <p className="font-semibold">결과 확인:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>비교보기, 원본만 보기, 결과만 보기 지원</li>
                        <li>돋보기 버튼으로 원본 영역 확인 가능</li>
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