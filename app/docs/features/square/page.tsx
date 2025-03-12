export const metadata = {
    title: 'Freesize 문서 - Square 가이드',
    description: 'Freesize Square 기능 상세 가이드 및 활용법',
};

export default function SquareDocPage() {
    return (
        <>
            <h1>Square 가이드</h1>

            <div className="mb-8">
                <h2>개요</h2>
                <p>
                    Square 기능은 생성형 AI를 활용하여 이미지를 정사각형으로 확장하는 기능입니다.
                    가로로 긴 이미지든 세로로 긴 이미지든 상관없이 자연스럽게 정사각형으로 변환하여
                    LORA 모델 학습에 일관된 형식의 이미지를 준비할 수 있습니다.
                </p>
            </div>

            <div className="mb-8">
                <h2>작동 원리</h2>
                <p>
                    Square 기능은 다음과 같은 과정으로 작동합니다:
                </p>
                <ol>
                    <li>
                        <strong>이미지 분석</strong>: 입력 이미지의 가로세로 비율과 내용을 분석합니다.
                    </li>
                    <li>
                        <strong>정사각형 설정</strong>: 이미지의 긴 변을 기준으로 정사각형 크기를 결정합니다.
                    </li>
                    <li>
                        <strong>생성형 확장</strong>: 생성형 AI를 사용하여 이미지의 부족한 부분을 자연스럽게
                        채워 정사각형으로 만듭니다.
                    </li>
                    <li>
                        <strong>컨텍스트 인식</strong>: 이미지의 내용을 이해하고 컨텍스트에 맞게 새로운
                        영역을 생성합니다.
                    </li>
                </ol>
            </div>

            <div className="mb-8">
                <h2>사용 방법</h2>
                <p>
                    Square 기능은 다음과 같은 방법으로 사용할 수 있습니다:
                </p>
                <ol>
                    <li>이미지를 업로드합니다.</li>
                    <li>Square 버튼을 클릭합니다.</li>
                    <li>처리가 완료될 때까지 기다립니다(약 25~40초).</li>
                    <li>결과 페이지에서 정사각형으로 확장된 이미지를 확인합니다.</li>
                </ol>
            </div>

            <div className="mb-8">
                <h2>해상도 옵션</h2>
                <p>
                    Square 기능은 다양한 해상도 옵션을 지원합니다. 원본 이미지의 크기와 사용 목적에 따라
                    적절한 해상도를 선택할 수 있습니다. (현재 MVP 단계에서는 해상도가 자동으로 결정됩니다.)
                </p>
            </div>

            <div className="mb-8">
                <h2>결과 확인</h2>
                <p>
                    Square 결과 페이지에서는 다음과 같은 기능을 제공합니다:
                </p>
                <ul>
                    <li>
                        <strong>비교 보기</strong>: 원본 이미지와 정사각형으로 확장된 이미지를 함께 볼 수 있습니다.
                    </li>
                    <li>
                        <strong>원본만 보기</strong>: 원본 이미지만 표시합니다.
                    </li>
                    <li>
                        <strong>결과만 보기</strong>: 정사각형으로 확장된 이미지만 표시합니다.
                    </li>
                    <li>
                        <strong>돋보기 기능</strong>: 확장된 이미지에서 원본 이미지 영역을 강조하여
                        보여줍니다. 이를 통해 새로 생성된 부분과 원본 부분을 구분할 수 있습니다.
                    </li>
                </ul>
            </div>

            <div className="mb-8">
                <h2>활용 사례</h2>
                <p>
                    Square 기능은 다음과 같은 상황에서 특히 유용합니다:
                </p>
                <ul>
                    <li>LORA 학습을 위한 일관된 형식의 이미지 준비</li>
                    <li>소셜 미디어용 정사각형 이미지 생성</li>
                    <li>프로필 사진이나 썸네일 이미지 제작</li>
                    <li>가로 또는 세로로 긴 이미지를 균형 있게 보완</li>
                    <li>Uncrop 작업의 중간 단계로 활용</li>
                </ul>
            </div>

            <div>
                <h2>권장 사항</h2>
                <p>
                    최상의 결과를 얻기 위한 권장 사항:
                </p>
                <ul>
                    <li>주요 피사체가 중앙에 위치한 이미지에서 더 자연스러운 결과를 얻을 수 있습니다.</li>
                    <li>극단적으로 길거나 좁은 이미지의 경우 확장 과정에서 왜곡이 발생할 수 있습니다.</li>
                    <li>다양한 해상도로 실험하여 최적의 결과를 찾아보세요.</li>
                    <li>정사각형으로 변환 후 Uncrop 기능을 적용하면 더 다양한 비율의 이미지를 얻을 수 있습니다.</li>
                </ul>
            </div>
        </>
    )
}