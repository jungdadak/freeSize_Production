'use client'
import Image from 'next/image';
import ResultTitle from "@/components/PageTitle/ResultTitle";
import CompareUpscale from "@/components/ComparePannel/Compare.upscale";
import {notFound, useSearchParams} from "next/navigation";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const originUrl = searchParams.get('originUrl');
    const resultUrl = searchParams.get('resultUrl');
    return (
        <>
            {/* 배경 이미지 – 기존 디자인 그대로 */}
            <Image
                src="/bgcat.webp"
                alt="Background Cat"
                priority
                className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
                width={2560}
                height={1440}
                sizes="100vw"
            />
            <div className={`max-w-7xl dark:bg-none mx-auto`}>
                <ResultTitle>Square</ResultTitle>

                {originUrl && resultUrl ? (<div className="max-w-full w-full">

                        <CompareUpscale originUrl={originUrl} resultUrl={resultUrl} height={700} width={700}/></div>
                ) : (
                    notFound()//todo: 그냥 쌩으로 접근한 경우 핸들링해야함
                )}
            </div>
        </>
    );
}