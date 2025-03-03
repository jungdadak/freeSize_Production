import React, {useState} from 'react';
import {cn} from '@/lib/utils';

interface UncropCompareProps {
    originUrl: string
    resultUrl: string
    className?: string
}

const UncropCompare = ({
                           originUrl,
                           resultUrl,
                           className
                       }: UncropCompareProps) => {
    const [showOriginal, setShowOriginal] = useState(true);
    const [isOriginLoading, setIsOriginLoading] = useState(true);
    const [isResultLoading, setIsResultLoading] = useState(true);

    const handleOriginLoad = () => {
        setIsOriginLoading(false);
    };

    const handleResultLoad = () => {
        setIsResultLoading(false);
    };

    const handleImageError = (type: 'origin' | 'result') => {
        if (type === 'origin') {
            setIsOriginLoading(false);
        } else {
            setIsResultLoading(false);
        }
        console.error(`이미지 로딩 실패: ${type}`);
    };

    return (
        <div className={cn(
            "relative w-[500px] h-[500px] flex items-center justify-center bg-gray-100 dark:bg-neutral-700 overflow-hidden",
            className
        )}>
            {(isOriginLoading || isResultLoading) && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {/* 결과 이미지 (확장된 이미지) - 아래에 위치 */}
            <img
                src={resultUrl}
                alt="확장된 이미지"
                className="absolute max-w-full max-h-full object-contain"
                onLoad={handleResultLoad}
                onError={() => handleImageError('result')}
                style={{opacity: isResultLoading ? 0 : 1}}
            />

            {/* 원본 이미지 - 위에 위치 */}
            <img
                src={originUrl}
                alt="원본 이미지"
                className="absolute max-w-full max-h-full object-contain z-10"
                style={{
                    opacity: isOriginLoading ? 0 : (showOriginal ? 1 : 0),
                    border: showOriginal ? '1px solid rgba(0, 0, 255, 0.3)' : 'none',
                    boxShadow: showOriginal ? '0 0 0 1px rgba(255, 255, 255, 0.5)' : 'none',
                }}
                onLoad={handleOriginLoad}
                onError={() => handleImageError('origin')}
            />

            {/* 컨트롤 버튼 */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
                <button
                    onClick={() => setShowOriginal(true)}
                    className={cn(
                        "px-3 py-1 text-sm rounded-md",
                        showOriginal ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    )}
                >
                    원본
                </button>
                <button
                    onClick={() => setShowOriginal(false)}
                    className={cn(
                        "px-3 py-1 text-sm rounded-md",
                        !showOriginal ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    )}
                >
                    결과
                </button>
            </div>
        </div>
    );
};

export default UncropCompare;