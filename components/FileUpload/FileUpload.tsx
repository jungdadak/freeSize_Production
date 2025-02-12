'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { fileSchema } from '@/schemas/imageUpload.schema';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setFile } from '@/store/fileSlice';

const FileUpload = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length !== 1) {
        alert('이미지 1장만 업로드 가능합니다.');
        return;
      }

      const file = acceptedFiles[0];
      const parsed = fileSchema.safeParse(file);

      if (!parsed.success) {
        alert(parsed.error.errors.map((err) => err.message).join('\n'));
        return;
      }

      const fileUrl = URL.createObjectURL(file);

      // ✅ 이미지 크기 검증 추가
      const img = new Image();
      img.src = fileUrl;
      img.onload = () => {
        if (img.width > 4000 || img.height > 4000) {
          alert(
            '이미지 크기가 너무 큽니다. 최대 4000x4000 픽셀까지 허용됩니다.'
          );
          URL.revokeObjectURL(fileUrl); // URL 해제
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

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: false, // ✅ 클릭으로 파일 업로드 가능하게 설정
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-5 text-center text-orange-500 cursor-pointer"
      onClick={open} // ✅ 클릭하면 파일 업로드 창이 뜨도록 설정
    >
      <input {...getInputProps()} />
      <p>여기에 파일을 드래그하거나 클릭하여 업로드하세요.</p>
    </div>
  );
};

export default FileUpload;
