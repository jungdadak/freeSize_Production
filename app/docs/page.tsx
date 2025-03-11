
import CompactPannel from "@/components/Pannel/CompactPannel";
import {FeatureCard} from "@/components/FeatureCard/FeatureCard";

export const metadata = {
    title: 'FreeSize - 이미지 전처리 서비스',
    description: 'LORA 모델 학습을 위한 이미지 전처리 서비스: Upscale, Uncrop, Square 기능을 제공합니다.',
};

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">FreeSize</h1>
                <p className="text-xl text-gray-600 mb-8">LORA 모델 학습을 위한 이미지 전처리 서비스</p>
                <div className="max-w-md mx-auto">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="mb-4">원하는 이미지를 업로드하고 전처리 기능을 테스트해보세요.</p>
                        <CompactPannel />
                    </div>
                </div>
            </header>

            <section className="max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">주요 기능</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Upscale"
                        description="이미지 비율을 유지하며 x1, x2, x4 해상도 향상. 기본 x4 스케일링 후 다운사이징으로 선명도 개선."
                        time="약 15초"
                        icon="/icons/upscale.svg"
                        link="/docs/upscale"
                    />
                    <FeatureCard
                        title="Uncrop"
                        description="이미지를 1:2 또는 2:1 비율로 확장하는 생성형 AI 서비스. 장/단변 기준으로 자연스럽게 확장."
                        time="약 25-40초"
                        icon="/icons/uncrop.svg"
                        link="/docs/uncrop"
                    />
                    <FeatureCard
                        title="Square"
                        description="다양한 해상도에서 이미지를 정사각형으로 확장. 가로/세로 어느 방향이든 정사각형으로 변환."
                        time="약 25-40초"
                        icon="/icons/square.svg"
                        link="/docs/square"
                    />
                </div>
            </section>

            <section className="max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">결과 확인</h2>
                <div className="bg-gray-100 p-8 rounded-lg">
                    <p className="mb-4 text-center">각 기능별 결과 페이지에서 제공하는 도구:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-3">Upscale 결과</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>두 이미지 비교 오버레이</li>
                                <li>변경점 하이라이트</li>
                                <li>확대 기능</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-3">Uncrop/Square 결과</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>비교 보기</li>
                                <li>원본만 보기</li>
                                <li>결과만 보기</li>
                                <li>돋보기 기능(원본 영역 찾기)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}