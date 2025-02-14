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

export default function FileOptionSelector() {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.file.file?.option);
  const [width, height] = useAppSelector((state) => [
    state.file.file?.width,
    state.file.file?.height,
  ]);
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
