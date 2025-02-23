'use client'
import React, {CSSProperties, MouseEvent, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {getImageDimensions} from '@/utils/getImageDimensionFromBlob';

interface CompareUpscaleProps {
    originUrl: string;
    resultUrl: string;
    width?: number;
    height?: number;
}

interface ImageDimensions {
    naturalWidth: number;
    naturalHeight: number;
}

export default function CompareUpscale({
                                           originUrl,
                                           resultUrl,
                                           width = 500,
                                           height = 500,
                                       }: CompareUpscaleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [processedDims, setProcessedDims] = useState<ImageDimensions | null>(null);
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);

    // 처리된 이미지의 자연 크기를 가져옴
    useEffect(() => {
        if (resultUrl) {
            getImageDimensions(resultUrl)
                .then((dims: ImageDimensions) => setProcessedDims(dims))
                .catch(err => console.error('이미지 로드 실패:', err));
        }
    }, [resultUrl]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({x, y});
        setShowMagnifier(true);
    };

    const handleMouseLeave = () => {
        setMousePos(null);
        setShowMagnifier(false);
    };

    // object-fit: contain 일 때 실제 렌더링되는 이미지 영역 계산
    let displayedWidth = width, displayedHeight = height, offsetX = 0, offsetY = 0;
    if (processedDims) {
        const {naturalWidth, naturalHeight} = processedDims;
        const scale = Math.min(width / naturalWidth, height / naturalHeight);
        displayedWidth = naturalWidth * scale;
        displayedHeight = naturalHeight * scale;
        offsetX = (width - displayedWidth) / 2;
        offsetY = (height - displayedHeight) / 2;
    }

    // 마우스가 있을 경우, 표시된 이미지 내에서의 상대 x 좌표(클리핑 기준)
    let relativeDivider = displayedWidth;
    if (mousePos && processedDims) {
        let relX = mousePos.x - offsetX;
        if (relX < 0) relX = 0;
        if (relX > displayedWidth) relX = displayedWidth;
        relativeDivider = relX;
    }

    // 원본 이미지 오버레이를 위한 클리핑 스타일 (좌측: 원본 이미지가 보여질 영역)
    const originalOverlayStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    };
    if (processedDims && mousePos) {
        // 실제 이미지 영역 내에서 좌측 영역만 보이도록 clipPath 적용
        originalOverlayStyle.clipPath = `polygon(${offsetX}px ${offsetY}px, ${offsetX + relativeDivider}px ${offsetY}px, ${offsetX + relativeDivider}px ${offsetY + displayedHeight}px, ${offsetX}px ${offsetY + displayedHeight}px)`;
    }

    // 줌 렌즈 설정 (좌측: 원본, 우측: 처리된 이미지 확대)
    const magnifierSize = 150;
    const zoom = 2;
    const bgSizeX = displayedWidth * zoom;
    const bgSizeY = displayedHeight * zoom;
    let ratioX = 0, ratioY = 0, fullBgPosX = 0, bgPosY = 0;
    if (processedDims && mousePos) {
        let mouseXRelative = mousePos.x - offsetX;
        let mouseYRelative = mousePos.y - offsetY;
        if (mouseXRelative < 0) mouseXRelative = 0;
        if (mouseXRelative > displayedWidth) mouseXRelative = displayedWidth;
        if (mouseYRelative < 0) mouseYRelative = 0;
        if (mouseYRelative > displayedHeight) mouseYRelative = displayedHeight;
        ratioX = mouseXRelative / displayedWidth;
        ratioY = mouseYRelative / displayedHeight;
        fullBgPosX = -(ratioX * bgSizeX - magnifierSize / 2);
        bgPosY = -(ratioY * bgSizeY - magnifierSize / 2);
    }

    const magnifierContainerStyle: CSSProperties = {
        position: 'absolute',
        left: mousePos ? mousePos.x - magnifierSize / 2 : 0,
        top: mousePos ? mousePos.y - magnifierSize / 2 : 0,
        width: magnifierSize,
        height: magnifierSize,
        borderRadius: '50%',
        overflow: 'hidden',
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        display: showMagnifier ? 'block' : 'none',
    };

    return (
        <div
            ref={containerRef}
            style={{position: 'relative', width, height, overflow: 'hidden'}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 기본: 처리된 이미지 전체를 배경으로 표시 */}
            <Image src={resultUrl} alt="처리된 이미지" fill style={{objectFit: 'contain'}}/>

            {/* 마우스가 있을 경우, 원본 이미지를 좌측에 오버레이하여 표시 */}
            {processedDims && mousePos && (
                <div style={originalOverlayStyle}>
                    <Image src={originUrl} alt="원본 이미지" fill style={{objectFit: 'contain'}}/>
                </div>
            )}

            {/* 줌 렌즈: 좌측은 원본, 우측은 처리된 이미지 확대 */}
            {processedDims && mousePos && (
                <div style={magnifierContainerStyle}>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: magnifierSize / 2,
                            height: magnifierSize,
                            backgroundImage: `url(${originUrl})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${bgSizeX}px ${bgSizeY}px`,
                            backgroundPosition: `${fullBgPosX + magnifierSize / 2}px ${bgPosY}px`,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: magnifierSize / 2,
                            top: 0,
                            width: magnifierSize / 2,
                            height: magnifierSize,
                            backgroundImage: `url(${resultUrl})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${bgSizeX}px ${bgSizeY}px`,
                            backgroundPosition: `${fullBgPosX - magnifierSize / 2}px ${bgPosY}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
