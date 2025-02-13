'use client';

import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { fileSchema } from '@/schemas/imageUpload.schema';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setFile } from '@/store/fileSlice';
import { ImagePlus } from 'lucide-react';

const FileUpload = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return; // 거부된 파일은 여기서 처리하지 않음

      const file = acceptedFiles[0];
      const parsed = fileSchema.safeParse(file);

      if (!parsed.success) {
        alert(parsed.error.errors.map((err) => err.message).join('\n'));
        return;
      }

      const fileUrl = URL.createObjectURL(file);

      const img = new Image();
      img.src = fileUrl;
      img.onload = () => {
        if (img.width > 4000 || img.height > 4000) {
          alert(
            '이미지 크기가 너무 큽니다. 최대 4000x4000 픽셀까지 허용됩니다.'
          );
          URL.revokeObjectURL(fileUrl);
          return;
        }

        dispatch(
          setFile({
            id: uuidv4(),
            name: file.name,
            size: file.size,
            url: fileUrl,
            width: img.width,
            height: img.height,
          })
        );
      };
    },
    [dispatch]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const error = fileRejections[0]?.errors[0];
    if (error?.code === 'file-too-large') {
      alert('파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.');
    } else if (error?.code === 'file-invalid-type') {
      alert('이미지 파일만 업로드 가능합니다.');
    } else if (error?.code === 'too-many-files') {
      alert('이미지 1장만 업로드 가능합니다.');
    } else {
      alert('파일 업로드에 실패했습니다.');
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-full aspect-square
        rounded-2xl
        border-4 border-dashed
        transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center gap-4
        cursor-pointer
        group
        ${
          isDragActive
            ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30'
            : 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600'
        }
      `}
      onClick={open}
    >
      <input {...getInputProps()} />

      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20 -z-10" />

      {/* 아이콘 컨테이너 */}
      <div className="relative">
        <div className="absolute inset-0 w-16 h-16 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-300" />
        <ImagePlus className="w-16 h-16 text-orange-500 dark:text-orange-400 relative transform group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* 텍스트 영역 */}
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
          {isDragActive ? '이미지를 놓아주세요!' : '이미지를 업로드하세요'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isDragActive ? (
            '파일을 여기에 드롭하세요'
          ) : (
            <>
              드래그 앤 드롭 또는{' '}
              <span className="text-orange-500 dark:text-orange-400 font-medium">
                클릭
              </span>
              하여 선택
            </>
          )}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          최대 5MB, 4000x4000 픽셀 이하의 이미지
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
