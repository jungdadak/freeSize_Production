export const metadata = {
    title: 'Freesize 문서 - FAQ',
    description: 'Freesize 서비스에 대한 자주 묻는 질문',
};

export default function FaqPage() {
    return (
        <>
            <h1>자주 묻는 질문 (FAQ)</h1>

            <div className="space-y-8 mt-6">
                <div>
                    <h2 className="text-xl font-semibold">일반 질문</h2>

                    <div className="mt-4 space-y-6">
                        <div>
                            <h3 className="font-medium">Freesize는 무료인가요?</h3>
                            <p className="mt-2">
                                현재 MVP 단계에서는 기본 기능을 무료로 테스트해볼 수 있습니다.
                                향후 사용량에 따른 유료 플랜이 제공될 예정입니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">회원 가입이 필요한가요?</h3>
                            <p className="mt-2">
                                현재 MVP 단계에서는 회원 가입 없이도 기본 기능을 테스트해볼 수 있습니다.
                                하지만 처리 기록 저장, API 액세스 등의 고급 기능을 사용하려면 향후 회원 가입이 필요할 수 있습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">LORA 모델이란 무엇인가요?</h3>
                            <p className="mt-2">
                                LORA(Low-Rank Adaptation)는 대규모 언어 또는 이미지 모델을 효율적으로 미세 조정하는 기법입니다.
                                Stable Diffusion과 같은 이미지 생성 모델에서는 LORA를 통해 특정 스타일, 캐릭터, 개념 등을
                                적은 양의 데이터로 학습시킬 수 있습니다. Freesize는 이러한 LORA 모델 학습에 필요한
                                이미지 전처리 도구를 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">기술적 질문</h2>

                    <div className="mt-4 space-y-6">
                        <div>
                            <h3 className="font-medium">지원되는 이미지 형식은 무엇인가요?</h3>
                            <p className="mt-2">
                                현재 PNG, JPG, WEBP 형식을 지원합니다. 최대 파일 크기는 10MB입니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">처리된 이미지는 어디에 저장되나요?</h3>
                            <p className="mt-2">
                                현재 MVP 단계에서는 처리된 이미지가 일시적으로 서버에 저장되며, 다운로드 후 일정 시간이 지나면
                                자동으로 삭제됩니다. 향후 회원 기능이 추가되면 개인 갤러리에 이미지를 저장할 수 있는
                                옵션이 제공될 예정입니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">이미지 처리에 어떤 AI 기술이 사용되나요?</h3>
                            <p className="mt-2">
                                Upscale 기능은 딥러닝 기반 초해상도(Super Resolution) 알고리즘을 사용합니다.
                                Uncrop과 Square 기능은 생성형 AI 기술을 활용하여 이미지를 자연스럽게 확장합니다.
                                모든 처리는 클라우드 서버에서 이루어지며, 지속적으로 모델을 업데이트하고 있습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">결과 이미지의 품질은 어떻게 결정되나요?</h3>
                            <p className="mt-2">
                                결과 이미지의 품질은 원본 이미지 품질, 선택한 처리 옵션, 이미지 콘텐츠 등 여러 요소에
                                영향을 받습니다. 고품질 원본 이미지는 일반적으로 더 좋은 결과를 제공합니다.
                                각 기능별 가이드에서 최상의 결과를 얻기 위한 권장 사항을 확인하세요.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">기능 관련 질문</h2>

                    <div className="mt-4 space-y-6">
                        <div>
                            <h3 className="font-medium">Upscale 기능은 항상 더 선명한 이미지를 만들어주나요?</h3>
                            <p className="mt-2">
                                Upscale 기능은 대부분의 경우 이미지 선명도를 향상시키지만, 원본 이미지의 품질에 따라
                                결과가 달라질 수 있습니다. 매우 낮은 해상도나 심하게 압축된 이미지의 경우 한계가 있을 수 있습니다.
                                x1 옵션도 이미지 품질 향상에 도움이 될 수 있습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">Uncrop과 Square의 차이점은 무엇인가요?</h3>
                            <p className="mt-2">
                                Square는 이미지를 정사각형으로 만들어주는 기능이고, Uncrop은 이미지를 1:2 또는 2:1 비율로
                                확장하는 기능입니다. Uncrop은 내부적으로 Square 처리를 먼저 수행한 후 추가로 확장합니다.
                                Square는 균형 잡힌 정사각형 이미지가 필요할 때, Uncrop은 파노라마 효과나 더 넓은 배경이
                                필요할 때 유용합니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">처리 시간이 왜 그렇게 오래 걸리나요?</h3>
                            <p className="mt-2">
                                Uncrop과 Square 기능은 생성형 AI를 사용하여 이미지를 확장하는 복잡한 과정을 거치기 때문에
                                약 25~40초가 소요됩니다. Upscale은 상대적으로 간단한 처리로 약 15초가 소요됩니다.
                                처리 시간은 서버 부하와 이미지 크기에 따라 달라질 수 있습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">한 번에 여러 장의 이미지를 처리할 수 있나요?</h3>
                            <p className="mt-2">
                                현재 MVP 단계에서는 한 번에 한 장의 이미지만 처리할 수 있습니다. 향후 업데이트에서
                                배치 처리 기능을 추가할 예정입니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">기타 질문</h2>

                    <div className="mt-4 space-y-6">
                        <div>
                            <h3 className="font-medium">처리된 이미지의 저작권은 누구에게 있나요?</h3>
                            <p className="mt-2">
                                Freesize로 처리된 이미지의 저작권은 원본 이미지의 저작권 소유자에게 있습니다.
                                Freesize는 이미지에 대한 어떠한 저작권도 주장하지 않습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">API를 상업적으로 사용할 수 있나요?</h3>
                            <p className="mt-2">
                                향후 도입될 유료 플랜에서는 API를 상업적으로 사용할 수 있는 옵션을 제공할 예정입니다.
                                현재 MVP 단계에서는 제한된 API 액세스만 가능합니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">버그를 발견하거나 기능 제안이 있으면 어떻게 해야 하나요?</h3>
                            <p className="mt-2">
                                웹사이트 하단의 피드백 폼을 통해 버그 리포트나 기능 제안을 보내주세요.
                                또는 support@freesize.ai로 이메일을 보내주셔도 됩니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">향후 추가될 기능은 무엇인가요?</h3>
                            <p className="mt-2">
                                향후 업데이트에서는 다음과 같은 기능을 추가할 예정입니다:
                            </p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>배치 처리 (여러 이미지 동시 처리)</li>
                                <li>사용자 계정 및 갤러리</li>
                                <li>더 다양한 비율 옵션</li>
                                <li>이미지 스타일 전이</li>
                                <li>노이즈 제거 및 향상된 업스케일링</li>
                                <li>API 사용량 모니터링 및 관리</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}