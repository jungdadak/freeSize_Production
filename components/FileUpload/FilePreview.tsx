'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearFile } from '@/store/fileSlice';
import FileUpload from './FileUpload';
import { FolderSync } from 'lucide-react';
import { formatFileSize } from '@/utils/fileSizeConverter';
import FileOptionSelector from './FileOptionSelector';

/**
 * 스토어에서 파일을 불러와서 랜더링시키는 컴포넌트
 */
const FilePreview = () => {
  const file = useAppSelector((state) => state.file.file);
  const dispatch = useAppDispatch();
  if (!file) return <FileUpload />; // 파일이 없으면 업로드 UI 표시
  // 정의한 유틸함수로 파일사이즈를 읽기좋게 만들어줍니다.
  const convertedFileSize = formatFileSize(file?.size);

  return (
    <div className="flex justify-between w-full gap-2">
      <div className="text-center bg-white dark:bg-black rounded-xl shadow-lg flex-1">
        <div className="relative inline-block">
          <p className="text-lg text-black text-lg dark:text-white mb-4 font-bold">
            <span className="text-orange-500">파일명: </span> {file.name}
          </p>
          {/* 새로고침 아이콘을 추가하여 파일 삭제 후 다시 업로드 가능하게 만듦 */}
          <button
            className="absolute -top-1 right-2 bg-yellow-500 text-white p-2 rounded-full hover:bg-orange-500 transition-all"
            onClick={() => dispatch(clearFile())} // 새로고침을 누르면 스토어를 초기화 시킵니다. 파일이 없기 때문에 업로드 ui가 뜰 것입니다.
          >
            <FolderSync />
          </button>
          {/* Blob의 경우 Image 컴포넌트를 쓰면 안된다는 클로드와 챗지피티의 조언에 따름 */}
          <img
            src={file.url}
            alt={file.name}
            className="w-auto h-64 rounded-xl border-2 border-yellow-300 dark:border-orange-600"
          />{' '}
          {/* 좌하단 - width x height 정보 */}
          <p className="absolute bottom-2 left-2 text-sm bg-yellow-500 bg-opacity-80 px-2 py-1 rounded-full text-white dark:bg-yellow-600">
            {file.width} x {file.height}
          </p>
          {/* 우하단 - 파일 크기 정보 */}
          <p className="absolute bottom-2 right-2 text-sm bg-yellow-500 bg-opacity-80 px-2 py-1 rounded-full text-white dark:bg-yellow-600">
            {convertedFileSize}
          </p>
        </div>
      </div>
      <div className="flex-none w-[270px]">
        <FileOptionSelector />
      </div>
    </div>
  );
};

export default FilePreview;
