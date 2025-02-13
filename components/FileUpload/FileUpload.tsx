'use client';

import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { fileSchema } from '@/schemas/imageUpload.schema';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setFile } from '@/store/fileSlice';
import { ImagePlus } from 'lucide-react';
import { sanitizeFileName } from '@/utils/fileNameConverter';

/**
 * 파일 업로드 컴포넌트 입니다.
 * 유저가 업로드한 파일에 대해 zod 런타임 검증을 수행합니다.
 * 이후 이미지의 가로세로 픽셀을 바탕으로 한번더 검증을 수행합니다.
 */
const FileUpload = () => {
  const dispatch = useAppDispatch();

  // useCallback 은 라이브러리 강제사항임 넘어갑시다. 라이브러리호환성을 위한 것이랍니다.
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return; // 거부된 파일은 여기서 처리하지 않음

      const file = acceptedFiles[0];
      //zod 를 사용해 런타임 파일체크
      const parsed = fileSchema.safeParse(file);

      if (!parsed.success) {
        alert(parsed.error.errors.map((err) => err.message).join('\n'));
        return;
      }

      // Blob Url 생성 -> 리덕스에 담기 적합
      const fileUrl = URL.createObjectURL(file);

      // 이미지 인스턴스 생성, 프로퍼티 설정
      const img = new Image();
      // bloburl을 객체 소스로 설정
      img.src = fileUrl;
      //onload 핸들러 (이미지 로드시 실행되는 이벤트리스너 -> 안정성 추가)
      img.onload = () => {
        // 이미지 디멘션 재차검증
        if (img.width > 4000 || img.height > 4000) {
          alert(
            '이미지 크기가 너무 큽니다. 최대 4000x4000 픽셀까지 허용됩니다.'
          );
          // 검증 실패시 bloburl 해제하여 성능유지
          URL.revokeObjectURL(fileUrl);
          return;
        }

        // 리덕스에 상태변경 요청 필드로 아이디, 파일명, 블롭주소, 디멘션 이런게 들어갑니다.
        dispatch(
          setFile({
            id: uuidv4(),
            //특수문자와 파일 확장자를 제거해 줍니다.(spring 개발자분 요구사항이기도 하고 이뻐보이고싶어서)
            name: sanitizeFileName(file.name),
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

  /**
   * 드롭존 이벤트가 발생하자마자 검증합니다.
   * zod보다 우선되어 실행됩니다.
   */
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const error = fileRejections[0]?.errors[0];

    switch (error?.code) {
      case 'file-too-large':
        alert('파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.');
        break;
      case 'file-invalid-type':
        alert('이미지 파일만 업로드 가능합니다.');
        break;
      case 'too-many-files':
        alert('이미지 1장만 업로드 가능합니다.');
        break;
      default:
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
        relative w-3/4 aspect-square m-auto
        rounded-2xl
        border-4 border-dashed
        transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center gap-4
        cursor-pointer
        group
        bg-white dark:bg-gray-900
        ${
          isDragActive
            ? 'border-orange-400 bg-orange-50 dark:bg-yellow-400'
            : 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600'
        }
      `}
      onClick={open}
    >
      <input {...getInputProps()} />

      {/* 배경 그라데이션 효과 수정 */}
      <div className="absolute scale-80 -inset-1 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-300 dark:to-yellow-950 opacity-50" />

      {/* 아이콘 컨테이너 */}
      <div className="relative">
        <div className="absolute inset-0 w-16 h-16 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-300" />
        <ImagePlus className="w-32 h-32 text-orange-500 dark:text-orange-400 relative transform group-hover:scale-110 transition-transform duration-300" />
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
