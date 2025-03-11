import Link from 'next/link';
import CompactPannel from "@/components/Pannel/CompactPannel";

export const metadata = {
    title: 'Square - Freesize',
    description: '이미지를 다양한 해상도에서 정사각형으로 확장하는 AI 서비스',
};

export default function SquarePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                ← 홈으로 돌아가기
            </Link>

            <h1 className="text-3xl font-bold mb-6">Square</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <p className="mb-4">
                        Square 기능은 3가지 해상도를 지원하며, 이미지를 정사각형으로 만들어줍니다.
                        가로로 긴 이미지든, 세로로 긴 이미지든 정사각형으로 자연스럽게 확장됩니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>생성형 AI로 빈 공간을 자연스럽게 채웁니다.</li>
                        <li>다양한 해상도 옵션 제공</li>
                        <li>Uncrop 기능의 기초가 되는 처리 과정</li>
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