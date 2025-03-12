export const metadata = {
    title: 'Freesize 문서 - 시작하기',
    description: 'Freesize 이미지 전처리 서비스 시작하기 가이드',
};

export default function GettingStartedPage() {
    return (
        <>
            <h1>시작하기</h1>

            <div className="mb-8">
                <p>
                    Freesize를 사용하여 이미지를 처리하는 방법을 단계별로 알아보겠습니다.
                    현재는 회원 가입 없이 메인 페이지에서 바로 이미지를 업로드하고 테스트할 수 있습니다.
                </p>
            </div>

            <div className="mb-8">
                <h2>1. 이미지 업로드</h2>
                <p>
                    메인 페이지에서 이미지를 업로드합니다. 다음과 같은 방법으로 이미지를 업로드할 수 있습니다:
                </p>
                <ul>
                    <li>업로드 영역을 클릭하여 파일 선택</li>
                    <li>파일을 드래그 앤 드롭하여 업로드</li>
                </ul>
                <p>
                    지원되는 이미지 형식: PNG, JPG, WEBP (최대 10MB)
                </p>
            </div>

            <div className="mb-8">
                <h2>2. 처리 기능 선택</h2>
                <p>
                    이미지 업로드 후, 사용할 처리 기능을 선택합니다:
                </p>
                <ul>
                    <li><strong>Upscale</strong>: 이미지 해상도 향상 (x1, x2, x4 옵션 선택 가능)</li>
                    <li><strong>Uncrop</strong>: 이미지를 1:2 또는 2:1 비율로 확장</li>
                    <li><strong>Square</strong>: 이미지를 정사각형으로 확장</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2>3. 처리 결과 확인</h2>
                <p>
                    이미지 처리가 완료되면 결과 페이지로 이동합니다. 각 기능별로 다른 결과 보기 옵션이 제공됩니다:
                </p>

                <h3>Upscale 결과 페이지</h3>
                <ul>
                    <li>두 이미지 비교 오버레이</li>
                    <li>변경점 하이라이트</li>
                    <li>확대 기능</li>
                </ul>

                <h3>Uncrop/Square 결과 페이지</h3>
                <ul>
                    <li>비교 보기</li>
                    <li>원본만 보기</li>
                    <li>결과만 보기</li>
                    <li>돋보기 기능 (원본 영역 찾기)</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2>4. 결과 이미지 다운로드</h2>
                <p>
                    결과 페이지에서 처리된 이미지를 다운로드할 수 있습니다. 다운로드 버튼을 클릭하여 이미지를 저장하세요.
                </p>
            </div>

            <div>
                <h2>다음 단계</h2>
                <p>
                    각 기능의 상세한 사용 방법과 고급 활용법은 기능별 가이드를 참조하세요:
                </p>
                <ul>
                    <li><a href="/docs/features/upscale">Upscale 가이드</a></li>
                    <li><a href="/docs/features/uncrop">Uncrop 가이드</a></li>
                    <li><a href="/docs/features/square">Square 가이드</a></li>
                </ul>
                <p>
                    API를 통해 Freesize 기능을 프로그래밍 방식으로 활용하려면 <a href="/docs/api">API 사용법</a>을 참조하세요.
                </p>
            </div>
        </>
    );
}