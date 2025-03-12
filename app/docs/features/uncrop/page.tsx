export const metadata = {
    title: 'Freesize 문서 - Uncrop 가이드',
    description: 'Freesize Uncrop 기능 상세 가이드 및 활용법',
};

export default function UncropDocPage() {
    return (
        <>
            <h1>Uncrop 가이드</h1>

            <div className="mb-8">
                <h2>개요</h2>
                <p>
                    Uncrop 기능은 생성형 AI를 활용하여 이미지를 확장하는 기능입니다.
                    이미지를 1:2 또는 2:1 비율로 자연스럽게 확장하여 LORA 모델 학습에 적합한
                    다양한 비율의 이미지를 준비할 수 있습니다.
                </p>
            </div>

            <div className="mb-8">
                <h2>작동 원리</h2>
                <p>
                    Uncrop 기능은 다음과 같은 과정으로 작동합니다:
                </p>
                <ol>
                    <li>
                        <strong>Square 처리</strong>: 입력 이미지를 먼저 Square 기능을 통해
                        정사각형으로 만듭니다.
                    </li>
                    <li>
                        <strong>비율 분석</strong>: 이미지의 장변과 단변을 분석하여 확장 방향을 결정합니다.
                    </li>
                    <li>
                        <strong>생성형 확장</strong>: 생성형 AI를 사용하여 이미지를 1:2 또는 2:1 비율로
                        자연스럽게 확장합니다.
                    </li>
                    <li>
                        <strong>컨텍스트 인식</strong>: 이미지의 내용을 이해하고 컨텍스트에 맞게
                        새로운 영역을 생성합니다.
                    </li>
                </ol>
            </div>

            <div className="mb-8">
                <h2>사용 방법</h2>
                <p>
                    Uncrop 기능은 다음과 같은 방법으로 사용할 수 있습니다:
                </p>
                <ol>
                    <li>이미지를 업로드합니다.</li>
                    <li>Uncrop 버튼을 클릭합니다.</li>
                    <li>처리가 완료될 때까지 기다립니다(약 25~40초).</li>
                    <li>결과 페이지에서 확장된 이미지를 확인합니다.</li>
                </ol>
            </div>

            <div className="mb-8">
                <h2>확장 방향</h2>
                <p>
                    Uncrop은 이미지의 비율에 따라 자동으로 확장 방향을 결정합니다:
                </p>
                <ul>
                    <li>
                        <strong>가로로 긴 이미지</strong>: 세로 방향으로 확장하여 1:2 비율(가로:세로)로 만듭니다.
                    </li>
                    <li>
                        <strong>세로로 긴 이미지</strong>: 가로 방향으로 확장하여 2:1 비율(가로:세로)로 만듭니다.
                    </li>
                    <li>
                        <strong>정사각형 이미지</strong>: 원하는 방향으로 확장할 수 있습니다(현재는 자동으로 결정됩니다).
                    </li>
                </ul>
            </div>

            <div className="mb-8">
                <h2>결과 확인</h2>
                <p>
                    Uncrop 결과 페이지에서는 다음과 같은 기능을 제공합니다:
                </p>
                <ul>
                    <li>
                        <strong>비교 보기</strong>: 원본 이미지와 확장된 이미지를 함께 볼 수 있습니다.
                    </li>
                    <li>
                        <strong>원본만 보기</strong>: 원본 이미지만 표시합니다.
                    </li>
                    <li>
                        <strong>결과만 보기</strong>: 확장된 이미지만 표시합니다.
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
                    Uncrop 기능은 다음과 같은 상황에서 특히 유용합니다:
                </p>
                <ul>
                    <li>LORA 학습을 위한 다양한 비율의 이미지 준비</li>
                    <li>특정 비율이 필요한 프로젝트에 맞게 이미지 조정</li>
                    <li>크롭된 이미지 복원 및 확장</li>
                    <li>배경 확장 및 컨텍스트 추가</li>
                    <li>이미지 구성 개선 및 시각적 효과 향상</li>
                </ul>
            </div>

            <div>
                <h2>권장 사항</h2>
                <p>
                    최상의 결과를 얻기 위한 권장 사항:
                </p>
                <ul>
                    <li>명확한 주제와 배경이 있는 이미지에서 더 좋은 결과를 얻을 수 있습니다.</li>
                    <li>복잡한 패턴이나 구조가 있는 이미지의 경우 결과가 다소 부자연스러울 수 있습니다.</li>
                    <li>결과가 만족스럽지 않은 경우, Square 기능을 먼저 사용한 후 수동으로 이미지를 편집하는 것을 고려하세요.</li>
                    <li>생성된 이미지의 경계 부분을 확인하여 자연스러운 연결성을 확인하세요.</li>
                </ul>
            </div>
        </>
    );
}