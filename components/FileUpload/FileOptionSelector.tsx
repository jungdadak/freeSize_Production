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

type FileMethod =
  | UpscaleOption['method']
  | UncropOption['method']
  | SquareOption['method'];
type FileOption =
  | UpscaleOption['options']
  | UncropOption['options']
  | SquareOption['options'];

const optionsMap: Record<FileMethod, FileOption[]> = {
  upscale: ['x1', 'x2', 'x4'],
  uncrop: ['1:2', '2:1'],
  square: ['768', '1024', '1536'],
};

// 옵션별 설명 텍스트
const optionDescriptions: Record<FileMethod, Record<string, string>> = {
  upscale: {
    x1: '원본 크기로 유지',
    x2: '원본 크기의 2배로 확대',
    x4: '원본 크기의 4배로 확대',
  },
  uncrop: {
    '1:2': '세로로 긴 형태로 확장',
    '2:1': '가로로 긴 형태로 확장',
  },
  square: {
    '768': '768x768 크기로 변환',
    '1024': '1024x1024 크기로 변환',
    '1536': '1536x1536 크기로 변환',
  },
};

export default function FileOptionSelector() {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.file.file?.option);
  const [method, setMethod] = useState<FileMethod>('upscale');
  const options = optionsMap[method];

  const handleOptionSelect = (option: FileOption) => {
    dispatch(
      setFileOption({ method, options: option } as
        | UpscaleOption
        | UncropOption
        | SquareOption)
    );
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
            <input
              type="radio"
              name="file-option"
              value={option}
              checked={selectedOption?.options === option}
              onChange={() => handleOptionSelect(option)}
              className={`w-5 h-5 border-2 rounded-full focus:ring-2 focus:ring-offset-2 ${
                selectedOption?.options === option
                  ? 'border-orange-500 dark:border-yellow-500'
                  : 'border-gray-400'
              }`}
            />
            <span className="text-gray-900 dark:text-gray-100">{option}</span>
          </label>
        ))}
      </div>
      {/* Description Text */}
      {selectedOption && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 mt-auto">
          {optionDescriptions[selectedOption.method][selectedOption.options]}
        </div>
      )}
      {/* Bottom Section - Confirm Button */}
      <div className="mt-auto">
        <Button
          className="bg-orange-500 dark:bg-yellow-500 hover:bg-yellow-600 hover:dark:bg-orange-600 dark:text-white font-black text-black w-full py-2 rounded-lg font-semibold rounded-xl"
          onClick={() =>
            console.log(`선택된 옵션: ${JSON.stringify(selectedOption)}`)
          }
        >
          시 작
        </Button>
      </div>
    </div>
  );
}
