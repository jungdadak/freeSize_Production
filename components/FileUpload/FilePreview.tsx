'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearFile } from '@/store/fileSlice';
import FileUpload from './FileUpload';
import { FolderSync } from 'lucide-react';
import { formatFileSize } from '@/utils/fileSizeConverter';
import FileOptionSelector from './FileOptionSelector';
import ProcessStatus from '../FileProcess/ProcessStatus';

/**
 * 인터랙티브 패널에 랜더링되는 컴포넌트
 * 파일이 있을 경우 랜더링되고, 파일이 없는 경우 FileUpload 컴포넌트 랜더링
 * 처리 시작시 유저에게 인터랙티브 화면 제공
 */
const FilePreview = () => {
  //redux fileslice 에서 파일 가져옴
  const file = useAppSelector((state) => state.file.file);
  const dispatch = useAppDispatch();

  const taskId = file?.taskId ?? null;
  const isProcessing = !!taskId; // taskId가 있으면 true, 없으면 false

  // 파일이 없으면 업로드 UI 표시
  if (!file) return <FileUpload />;
  // 정의한 유틸함수로 파일사이즈를 읽기좋게 만들어줍니다. (mb, kb, b, gb)
  const convertedFileSize = formatFileSize(file?.size);

  return (
    <div className="flex justify-between w-full gap-2">
      <div className="text-center bg-white dark:bg-black rounded-xl shadow-lg flex-1">
        <div className="relative inline-block">
          <p className="text-lg text-black dark:text-white mb-4 font-bold">
            <span className="text-orange-500">파일명: </span> {file.name}
          </p>
          {!isProcessing && (
            <button
              className="absolute -top-1 right-2 bg-yellow-500 text-white p-2 rounded-full hover:bg-orange-500 transition-all"
              onClick={() => dispatch(clearFile())}
            >
              <FolderSync />
            </button>
          )}

          {/* 🔹 taskId가 있으면 animate-pulse 추가 */}
          <img
            src={file.url}
            alt={file.name}
            className={`w-auto h-64 rounded-xl border-2 border-yellow-300 dark:border-orange-600 
              ${isProcessing ? 'animate-pulse brightness-50' : ''}`}
          />

          {/* 🔹 taskId가 없을 때만 정보 표시 */}
          {!isProcessing && (
            <>
              <p className="absolute bottom-2 left-2 text-sm bg-yellow-500 bg-opacity-80 px-2 py-1 rounded-full text-white dark:bg-yellow-600">
                {file.width} x {file.height}
              </p>
              <p className="absolute bottom-2 right-2 text-sm bg-yellow-500 bg-opacity-80 px-2 py-1 rounded-full text-white dark:bg-yellow-600">
                {convertedFileSize}
              </p>
            </>
          )}
        </div>
      </div>

      {/* 🔹 taskId가 있으면 처리 UI, 없으면 옵션 선택 UI */}
      <div className="flex-none w-[270px]">
        {isProcessing ? <ProcessStatus /> : <FileOptionSelector />}
      </div>
    </div>
  );
};

export default FilePreview;
