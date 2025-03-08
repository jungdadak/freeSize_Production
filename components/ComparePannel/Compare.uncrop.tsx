'use client'
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {getImageDimensions} from "@/utils/getImageDimensionFromBlob";

interface CompareUncropProps {
    originUrl: string;
    resultUrl: string;
    viewMode: string;
    zoomLevel: number;
    className?: string;
}

interface ImageDimension {
    naturalWidth: number;
    naturalHeight: number;
}

// 기본 이미지 크기 (로딩 중 또는 오류 발생 시 사용)
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const CompareUncrop = ({
                           originUrl,
                           resultUrl,
                           viewMode,
                           zoomLevel,
                           className = ''
                       }: CompareUncropProps) => {
    const [isLoading, setIsLoading] = useState(true);

    // 이미지 치수를 저장할 상태 - 초기값을 기본값으로 설정
    const [dimensions, setDimensions] = useState<{
        origin: ImageDimension;
        result: ImageDimension;
    }>({
        origin: {naturalWidth: DEFAULT_WIDTH, naturalHeight: DEFAULT_HEIGHT},
        result: {naturalWidth: DEFAULT_WIDTH, naturalHeight: DEFAULT_HEIGHT}
    });

    const [hasError, setHasError] = useState(false);

    // 확장 방향 및 비율 계산
    const calculateScalingInfo = () => {
        const originWidth = dimensions.origin.naturalWidth;
        const originHeight = dimensions.origin.naturalHeight;
        const resultWidth = dimensions.result.naturalWidth;
        const resultHeight = dimensions.result.naturalHeight;
        

        // 원본 대비 확장 비율
        const widthRatio = resultWidth / originWidth;
        const heightRatio = resultHeight / originHeight;

        // 확장 방향 및 스케일 계산
        let isHorizontalExpansion = false;
        let displayWidth, displayHeight;

        // 가로로 확장된 경우
        if (widthRatio > heightRatio) {
            isHorizontalExpansion = true;
            // 원본 이미지를 결과 이미지 높이에 맞춤
            displayHeight = resultHeight;
            displayWidth = originWidth * (resultHeight / originHeight);
        }
        // 세로로 확장된 경우
        else {
            isHorizontalExpansion = false;
            // 원본 이미지를 결과 이미지 너비에 맞춤
            displayWidth = resultWidth;
            displayHeight = originHeight * (resultWidth / originWidth);
        }

        return {
            isHorizontalExpansion,
            displayWidth,
            displayHeight,
            widthRatio,
            heightRatio
        };
    };

    // 이미지 로드 및 치수 가져오기
    useEffect(() => {
        const fetchDimensions = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const [originDim, resultDim] = await Promise.all([
                    getImageDimensions(originUrl),
                    getImageDimensions(resultUrl)
                ]);

                if (!originDim || !resultDim) {
                    setHasError(true);
                } else {
                    setDimensions({
                        origin: originDim,
                        result: resultDim
                    });
                }
            } catch (err) {
                console.error("이미지 치수 가져오기 오류:", err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchDimensions();
    }, [originUrl, resultUrl]);

    // 로딩 중 표시
    if (isLoading) {
        return (
            <div className={`${className} w-full h-full`}>
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            </div>
        );
    }

    // 오류 발생 시 표시
    if (hasError) {
        return (
            <div className={`${className} w-full h-full`}>
                <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center">
                    <p className="text-white mb-2">이미지를 불러올 수 없습니다.</p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    // 스케일링 정보 계산
    const scalingInfo = calculateScalingInfo();

    // 비교 모드 렌더링 - 결과 이미지 위에 원본 이미지를 확장 방향에 맞게 스케일링하여 표시
    const renderCompareMode = () => {
        const resultSize = {
            width: dimensions.result.naturalWidth * (zoomLevel / 100),
            height: dimensions.result.naturalHeight * (zoomLevel / 100)
        };

        const originalSize = {
            width: scalingInfo.displayWidth * (zoomLevel / 100),
            height: scalingInfo.displayHeight * (zoomLevel / 100)
        };

        return (
            <div className="relative w-full h-full bg-neutral-800 flex items-center justify-center">
                {/* 결과 이미지 */}
                <div style={{
                    width: `${resultSize.width}px`,
                    height: `${resultSize.height}px`,
                    position: 'relative'
                }}>
                    <Image
                        src={resultUrl}
                        alt="결과 이미지"
                        fill
                        quality={100}
                        style={{objectFit: 'contain'}}
                    />

                    {/* 원본 이미지 영역 표시 (중앙 정렬) */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: `${originalSize.width}px`,
                        height: `${originalSize.height}px`,
                        border: '2px dashed yellow'
                    }}/>
                </div>

                {/* 확장 방향 및 비율 정보 표시 */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {scalingInfo.isHorizontalExpansion
                        ? `가로 확장 (${Math.round(scalingInfo.widthRatio * 100)}%)`
                        : `세로 확장 (${Math.round(scalingInfo.heightRatio * 100)}%)`}
                </div>
            </div>
        );
    };

    // 원본만 보기 모드
    const renderOriginalMode = () => (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <div style={{
                width: `${dimensions.origin.naturalWidth * (zoomLevel / 100)}px`,
                height: `${dimensions.origin.naturalHeight * (zoomLevel / 100)}px`,
                position: 'relative'
            }}>
                <Image
                    src={originUrl}
                    alt="원본 이미지"
                    fill
                    quality={100}
                    style={{objectFit: 'contain'}}
                />
            </div>
        </div>
    );

    // 결과만 보기 모드
    const renderResultMode = () => (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <div style={{
                width: `${dimensions.result.naturalWidth * (zoomLevel / 100)}px`,
                height: `${dimensions.result.naturalHeight * (zoomLevel / 100)}px`,
                position: 'relative'
            }}>
                <Image
                    src={resultUrl}
                    alt="결과 이미지"
                    fill
                    quality={100}
                    style={{objectFit: 'contain'}}
                />
            </div>
        </div>
    );

    // 현재 뷰 모드에 따라 적절한 렌더링 함수 호출
    let content;
    switch (viewMode) {
        case 'original':
            content = renderOriginalMode();
            break;
        case 'result':
            content = renderResultMode();
            break;
        case 'compare':
        default:
            content = renderCompareMode();
            break;
    }

    return (
        <div className={`${className} w-full h-full overflow-hidden`} data-testid="compare-uncrop-container">
            {content}
        </div>
    );
};

export default CompareUncrop;