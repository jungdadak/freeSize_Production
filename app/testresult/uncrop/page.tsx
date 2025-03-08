'use client'
import Image from 'next/image';
import {notFound, useSearchParams} from "next/navigation";
import UpscaleSummary from "@/app/testresult/ProcessSummary";
import {useEffect, useState} from "react";
import {getImageDimensions} from "@/utils/getImageDimensionFromBlob";
import {useAppSelector} from "@/lib/redux/hooks";
import ResultTitle from "@/components/PageTitle/ResultTitle";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Slider} from "@/components/ui/slider";
import {Info, RotateCcw, ZoomIn, ZoomOut} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import CompareUncrop from "@/components/ComparePannel/Compare.uncrop";

// 이미지 치수를 위한 인터페이스 정의
interface ImageDimension {
    naturalWidth: number;
    naturalHeight: number;
}

export default function UncropResultPage() {
    const searchParams = useSearchParams();
    const originUrl = searchParams.get('originUrl');
    const resultUrl = searchParams.get('resultUrl');

    // 두 이미지 치수를 하나의 상태로 관리
    const [dimensions, setDimensions] = useState<{
        origin: ImageDimension | null;
        result: ImageDimension | null;
    }>({
        origin: null,
        result: null
    });

    // 뷰 모드 상태 (비교, 원본만, 결과만)
    const [viewMode, setViewMode] = useState("compare");

    // 줌 레벨 상태 (기본값 100%)
    const [zoomLevel, setZoomLevel] = useState(100);

    // Redux 스토어에서 파일 이름 가져오기 (기본값 설정)
    const fileName = useAppSelector((state) => state.file.file?.name || "Untitled");

    // 치수 정보를 문자열로 변환하는 함수
    const formatDimension = (dim: ImageDimension | null): string => {
        return dim ? `${dim.naturalWidth} × ${dim.naturalHeight}` : 'Loading...';
    };

    // URL이 변경될 때 이미지 치수 가져오기
    useEffect(() => {
        // 두 이미지 치수를 가져오는 비동기 함수
        const fetchDimensions = async () => {
            if (originUrl) {
                try {
                    const originDim = await getImageDimensions(originUrl);
                    setDimensions(prev => ({...prev, origin: originDim}));
                } catch (err) {
                    console.error("원본 이미지 치수 가져오기 오류:", err);
                }
            }

            if (resultUrl) {
                try {
                    const resultDim = await getImageDimensions(resultUrl);
                    setDimensions(prev => ({...prev, result: resultDim}));
                } catch (err) {
                    console.error("결과 이미지 치수 가져오기 오류:", err);
                }
            }
        };

        void fetchDimensions();
    }, [originUrl, resultUrl]);

    // 줌 리셋 함수
    const resetZoom = () => {
        setZoomLevel(100);
    };

    // URL이 없으면 404 반환
    if (!originUrl || !resultUrl) {
        return notFound();
    }

    return (
        <>
            {/* 배경 이미지 */}
            <Image
                src="/bgcat.webp"
                alt="Background Cat"
                priority
                className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
                width={2560}
                height={1440}
                sizes="100vw"
            />
            {/* TooltipProvider를 전체 컴포넌트를 감싸는 최상위 레벨에 배치 */}
            <TooltipProvider>
                <div className="max-w-7xl mx-auto p-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* 좌측 이미지 렌더 영역 (메인 섹션) */}
                        <div className="md:w-2/3 mb-4 md:mb-0">
                            <Card className="flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                    <ResultTitle>Uncrop</ResultTitle>

                                    <div className="flex space-x-2 items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                                                >
                                                    <ZoomOut size={20}/>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>축소</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Slider
                                            value={[zoomLevel]}
                                            min={50}
                                            max={200}
                                            step={10}
                                            className="w-32"
                                            onValueChange={(values) => setZoomLevel(values[0])}
                                        />

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
                                                >
                                                    <ZoomIn size={20}/>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>확대</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <span className="text-sm">{zoomLevel}%</span>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={resetZoom}
                                                >
                                                    <RotateCcw size={18}/>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>원래 크기로 재설정</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </CardHeader>

                                <div
                                    className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700">
                                    <ToggleGroup type="single" value={viewMode}
                                                 onValueChange={(value) => value && setViewMode(value)}>
                                        <ToggleGroupItem value="compare" aria-label="비교 보기">
                                            <span className="mr-2">비교 보기</span>
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="original" aria-label="원본만">
                                            <span className="mr-2">원본만</span>
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="result" aria-label="결과만">
                                            <span className="mr-2">결과만</span>
                                        </ToggleGroupItem>
                                    </ToggleGroup>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Info size={18}/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-xs">
                                            <p>확대/축소를 통해 이미지를 자세히 볼 수 있습니다. 비교 보기에서는 원본 이미지가 노란색 테두리로 표시됩니다.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                <CardContent className="p-0 bg-neutral-800" style={{height: '70vh'}}>
                                    <div className="w-full h-full relative overflow-hidden">
                                        <CompareUncrop
                                            originUrl={originUrl}
                                            resultUrl={resultUrl}
                                            viewMode={viewMode}
                                            zoomLevel={zoomLevel}
                                            className="h-full w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 우측 요약 및 다운로더 영역 */}
                        <div className="md:w-1/3">
                            <UpscaleSummary
                                fileName={fileName}
                                resultUrl={resultUrl}
                                originDimension={formatDimension(dimensions.origin)}
                                resultDimension={formatDimension(dimensions.result)}
                            />
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </>
    );
}