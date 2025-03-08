'use client'
import React, {CSSProperties, MouseEvent, TouchEvent, useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {getImageDimensions} from '@/utils/getImageDimensionFromBlob';
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {toast} from "sonner";

interface CompareUpscaleProps {
    originUrl: string;
    resultUrl: string;
    width?: number;
    height?: number;
    className?: string;
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
                                           className,
                                       }: CompareUpscaleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [touchPoint, setTouchPoint] = useState<{ x: number; y: number } | null>(null);
    const [processedDims, setProcessedDims] = useState<ImageDimensions | null>(null);
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // 디바이스 타입 감지
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    // 처리된 이미지의 자연 크기를 가져옴
    useEffect(() => {
        if (resultUrl) {
            setIsLoading(true);
            getImageDimensions(resultUrl)
                .then((dims: ImageDimensions) => {
                    setProcessedDims(dims);
                    setIsLoading(false);
                    toast.success("이미지 처리가 완료되었습니다.");  // 성공 메시지
                })
                .catch(() => {
                    toast.error("이미지 처리 중 오류가 발생했습니다.");  // 오류 메시지
                    router.push('/notfound');
                });
        }
    }, [router, resultUrl]);

    // 성능 최적화를 위한 움직임 처리 함수
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    const animateMovement = useCallback((time: number) => {
        if (previousTimeRef.current !== null) {
            // 약 60fps로 제한 (약 16.7ms마다 업데이트)
            const elapsed = time - previousTimeRef.current;
            if (elapsed > 16) {
                previousTimeRef.current = time;
                // 여기서 실제 위치 업데이트 로직 실행
                if (containerRef.current && mousePos) {
                    setShowMagnifier(true);
                }
            }
        } else {
            previousTimeRef.current = time;
        }
    }, [mousePos]);

    useEffect(() => {
        const animate = (time: number) => {
            animateMovement(time);
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }
        };
    }, [animateMovement, touchPoint]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return; // 터치 디바이스에서는 마우스 이벤트 무시

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({x, y});
    };

    const handleMouseLeave = () => {
        setMousePos(null);
        setShowMagnifier(false);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        e.preventDefault(); // 기본 스크롤 동작 방지
        const touch = e.touches[0];
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // 확대경 위치 조정 (터치 위치보다 위에 표시)
        setMousePos({x, y: Math.max(y - 100, magnifierSize / 2)}); // 손가락 위 100px에 확대경 위치, 화면 밖으로 나가지 않도록 함
        setTouchPoint({x, y}); // 실제 터치 위치 저장
        setShowMagnifier(true);
    };

    const handleTouchEnd = () => {
        setMousePos(null);
        setTouchPoint(null);
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

    // 줌 렌즈 설정
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
        zIndex: 10,
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden select-none", className)}
            style={typeof width === 'number' && typeof height === 'number' ? {width, height} : undefined}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="이미지 비교 시각화 도구"
            role="application"
        >
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p>이미지 로딩 중...</p>
                </div>
            ) : (
                <>
                    <Image
                        src={resultUrl}
                        alt="처리된 이미지"
                        fill
                        style={{objectFit: 'contain'}}
                        aria-hidden={showMagnifier}
                    />

                    {processedDims && mousePos && (
                        <div
                            style={originalOverlayStyle}
                            aria-hidden="true"
                        >
                            <Image
                                src={originUrl}
                                alt="원본 이미지"
                                fill
                                style={{objectFit: 'contain'}}
                            />
                        </div>
                    )}

                    {processedDims && mousePos && showMagnifier && (
                        <div style={magnifierContainerStyle} aria-label="확대 렌즈" role="img">
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
                                    backgroundPosition: `${fullBgPosX}px ${bgPosY}px`,
                                }}
                                aria-hidden="true"
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
                                    backgroundPosition: `${fullBgPosX}px ${bgPosY}px`,
                                }}
                                aria-hidden="true"
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    width: 1,
                                    height: '100%',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    zIndex: 1,
                                }}
                                aria-hidden="true"
                            />
                        </div>
                    )}

                    {touchPoint && mousePos && showMagnifier && (
                        <svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                                zIndex: 5,
                            }}
                            aria-hidden="true"
                        >
                            <line
                                x1={touchPoint.x}
                                y1={touchPoint.y}
                                x2={mousePos.x}
                                y2={mousePos.y + magnifierSize / 2}
                                style={{
                                    stroke: '#000',
                                    strokeWidth: 1,
                                    strokeDasharray: '5,5',
                                    opacity: 0.7,
                                }}
                            />
                            <circle
                                cx={touchPoint.x}
                                cy={touchPoint.y}
                                r={10}
                                style={{
                                    fill: 'rgba(0,0,0,0.2)',
                                    stroke: '#000',
                                    strokeWidth: 1,
                                }}
                            />
                        </svg>
                    )}

                    <div
                        className="absolute bottom-2 left-2 right-2 flex justify-center gap-x-2 bg-white bg-opacity-70 p-1 rounded text-xs">
                        <span>원본 이미지와 처리된 이미지를 비교하려면 마우스 또는 터치로 이미지를 탐색하세요</span>
                    </div>
                </>
            )}
        </div>
    );
}