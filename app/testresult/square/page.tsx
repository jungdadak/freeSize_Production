'use client'
import Image from 'next/image';
import {notFound, useSearchParams} from "next/navigation";
import UpscaleSummary from "@/app/testresult/ProcessSummary";
import {useEffect, useState} from "react";
import {getImageDimensions} from "@/utils/getImageDimensionFromBlob";
import {useAppSelector} from "@/lib/redux/hooks";
import ResultTitle from "@/components/PageTitle/ResultTitle";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import CompareUncrop from "@/components/ComparePannel/Compare.uncrop";

// 이미지 치수를 위한 인터페이스 정의
interface ImageDimension {
    naturalWidth: number;
    naturalHeight: number;
}

export default function ResultPage() {

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

        fetchDimensions();
    }, [originUrl, resultUrl]);

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
            <div className="max-w-7xl dark:bg-none mx-auto">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    {/* 좌측 이미지 렌더 영역 (메인 섹션) */}
                    <div className="md:w-2/3 mb-4 md:mb-0">
                        <Card className="h-full flex flex-col">
                            <CardHeader className={`p-0`}>
                                <ResultTitle>Square</ResultTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-center justify-center p-0 bg-neutral-800">
                                <CompareUncrop
                                    originUrl={originUrl}
                                    resultUrl={resultUrl}
                                    className={`w-full`}
                                />
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
        </>
    );
}