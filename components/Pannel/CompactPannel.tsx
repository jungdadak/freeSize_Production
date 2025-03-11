'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { useTestRedirectOnSuccess } from "@/hooks/useTestRedirectionOnSuccess";
import FilePreview from "@/components/FileUpload/FilePreview";
import FileUpload from "@/components/FileUpload/FileUpload";

/**
 * 메인페이지에 표시되는 명함 형태의 이미지 업로드 컴포넌트입니다.
 * FilePreview와 FileUpload를 조건부로 렌더링합니다.
 */
export default function CompactPannel() {
    // 업로드 성공 시 리디렉션을 처리하는 훅
    useTestRedirectOnSuccess();

    // 리덕스 스토어에서 파일 데이터를 가져옵니다
    const file = useAppSelector((state) => state.file.file);

    return (
        <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
                {/* 헤더 영역 */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-orange-500 w-2 h-2 rounded-full"></span>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            이미지 테스트
                        </h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Freesize 기능을 테스트할 이미지를 업로드하세요
                    </p>
                </div>

                {/* 이미지 업로드 영역 */}
                <div className="w-full">
                    {file ? <FilePreview /> : <FileUpload />}
                </div>
            </div>
        </div>
    );
}