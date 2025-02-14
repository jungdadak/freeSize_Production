'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFileOption } from '@/store/fileSlice';
import { Button } from '@/components/ui/button';
import type {
  UpscaleOption,
  UncropOption,
  SquareOption,
} from '@/store/fileSlice';
import { FileOptionResult } from '@/utils/calculateDimension';
import { FileMethod, FileOption, optionsMap } from '@/types/Options';

export default function FileOptionSelector() {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.file.file?.option);
  const submitData = useAppSelector((state) => ({
    id: state.file.file?.id,
    name: state.file.file?.name,
    originBlob: state.file.file?.url,
    method: state.file.file?.option?.method,
    options: state.file.file?.option?.options,
  }));
  const [width, height] = useAppSelector((state) => [
    state.file.file?.width,
    state.file.file?.height,
  ]);
  const [method, setMethod] = useState<FileMethod>('upscale');
  const options = optionsMap[method];
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (option: FileOption) => {
    dispatch(
      setFileOption({ method, options: option } as
        | UpscaleOption
        | UncropOption
        | SquareOption)
    );
  };

  const handleSubmit = async () => {
    if (
      !submitData.id ||
      !submitData.name ||
      !submitData.originBlob ||
      !submitData.method
    ) {
      setIsSubmitted(false);
      alert('새로고침후 다시 시도해 주세요');
      return;
    }

    setIsSubmitted(true); // 요청 시작 시 로딩 상태로 변경

    try {
      const taskId = submitData.id + submitData.name;
      const formData = new FormData();

      // Blob URL을 Blob으로 변환
      const blobResponse = await fetch(submitData.originBlob);
      const blob = await blobResponse.blob();
      formData.append('file', blob, submitData.name); // 파일명 추가

      const optionParam = {
        upscale: 'upscaleRatio',
        uncrop: 'targetRatio',
        square: 'targetRes',
      }[submitData.method];

      // API 요청
      const uploadResponse = await fetch(
        `/api/testone/${submitData.method}?taskId=${taskId}&${optionParam}=${submitData.options}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('업로드 실패');
      }

      const data = await uploadResponse.json();
      // 성공 처리
      setIsSubmitted(false); // 성공 시 로딩 상태 해제
    } catch (error) {
      console.error('Error:', error); // 에러 로깅 추가
      setIsSubmitted(false);
      alert('에러가 발생했습니다');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-black">
      {/* Top Section - Tabs */}
      <div className="flex-none">
        <div className="flex justify-center space-x-2 mb-4">
          {(Object.keys(optionsMap) as FileMethod[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMethod(tab)}
              className={`px-4 py-2 rounded-xl transition-all ${
                method === tab
                  ? 'bg-orange-500 text-white dark:bg-yellow-500 dark:text-black'
                  : 'bg-yellow-200 text-gray-800 dark:bg-gray-800 dark:text-yellow-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Middle Section - Radio Buttons & Description */}
      <div className="flex flex-col space-y-2 mb-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative w-5 h-5">
              <input
                type="radio"
                name="file-option"
                value={option}
                checked={selectedOption?.options === option}
                onChange={() => handleOptionSelect(option)}
                className="sr-only peer"
              />
              <div className="absolute w-5 h-5 border transition-colors peer-checked:border-yellow-600 peer-checked:dark:border-orange-600 border-gray-400 rounded-sm bg-white dark:bg-black" />
              <div className="absolute w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-yellow-600 dark:stroke-orange-600 stroke-[3]"
                >
                  <polyline points="20 6 9 17 4 12" fill="none" />
                </svg>
              </div>
            </div>
            <span className="text-gray-900 dark:text-gray-100">{option}</span>
          </label>
        ))}
      </div>

      {/* Bottom Section - Confirm Button */}
      <div className="mt-auto">
        {/* Description Text */}
        {selectedOption && (
          <FileOptionResult
            method={selectedOption.method}
            selectedOption={selectedOption.options}
            width={width}
            height={height}
          />
        )}
        <Button
          className="bg-orange-500 dark:bg-yellow-500 hover:bg-yellow-600 hover:dark:bg-orange-600 dark:text-white font-black text-black w-full py-2 rounded-lg font-semibold rounded-xl"
          onClick={handleSubmit}
        >
          {isSubmitted ? 'loading' : '시 작'}
        </Button>
      </div>
    </div>
  );
}
