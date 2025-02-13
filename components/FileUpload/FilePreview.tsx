'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearFile } from '@/store/fileSlice';
import FileUpload from './FileUpload';
import { FolderSync } from 'lucide-react';

const FilePreview = () => {
  const file = useAppSelector((state) => state.file.file);
  const dispatch = useAppDispatch();

  if (!file) return <FileUpload />; // ✅ 파일이 없으면 업로드 UI 표시

  return (
    <div className="mt-4 text-center bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <div className="relative inline-block">
        <img
          src={file.url}
          alt={file.name}
          className="w-auto h-64 rounded-lg border border-gray-300 dark:border-gray-700"
        />
        {/* ✅ 새로고침 아이콘을 추가하여 파일 삭제 후 다시 업로드 가능하게 만듦 */}
        <button
          className="absolute top-2 right-2 bg-yellow-500 text-white p-2 rounded-full hover:bg-orange-500 transition-all"
          onClick={() => dispatch(clearFile())} // ✅ 파일 삭제 후 다시 업로드 가능
        >
          <FolderSync />
        </button>
      </div>
      <div className="mt-4 text-black dark:text-white">
        <p className="text-sm font-semibold">파일명: {file.name}</p>
        <p className="text-sm">크기: {file.size} bytes</p>
        <p className="text-sm">
          해상도: {file.width} x {file.height}
        </p>
      </div>
    </div>
  );
};

export default FilePreview;
