import React from 'react';
import { FileMethod, optionDescriptions } from '@/types/Options';

interface FileOptionResultProps {
  method: FileMethod;
  selectedOption: string;
  width?: number;
  height?: number;
}

export function FileOptionResult({
  method,
  selectedOption,
  width,
  height,
}: FileOptionResultProps) {
  const calculateDimensions = () => {
    if (!width || !height) return '';

    switch (method) {
      case 'upscale':
        const scale = parseInt(selectedOption.substring(1));
        return `${width * scale} x ${height * scale}`;

      case 'uncrop':
        const [widthRatio, heightRatio] = selectedOption.split(':').map(Number);
        // 가로:세로 비율을 맞추기 위해 현재 비율 계산
        const currentRatio = width / height;
        const targetRatio = widthRatio / heightRatio;

        if (targetRatio > currentRatio) {
          // 목표 비율이 더 넓은 경우 -> 가로 확장
          const newWidth = Math.round(height * targetRatio);
          return `${newWidth} x ${height}`;
        } else {
          // 목표 비율이 더 좁은 경우 -> 세로 확장
          const newHeight = Math.round(width / targetRatio);
          return `${width} x ${newHeight}`;
        }

      case 'square':
        return `${selectedOption} x ${selectedOption}`;

      default:
        return `${width} x ${height}`;
    }
  };

  return (
    <div className="bg-indigo-500/60 p-2 mb-3 flex flex-col gap-2">
      <div className="text-sm flex gap-3 text-yellow-300">
        <p>
          <span className="text-emerald-300 font-black">::</span>{' '}
          &nbsp;&nbsp;선택됨&nbsp;&nbsp;
          <span className="text-emerald-300 font-black"> ::</span>
        </p>
        <p className="mx-auto">{optionDescriptions[method][selectedOption]}</p>
      </div>
      <div className="flex  text-sm text-yellow-300 ">
        <p className="flex ">
          <span className="text-emerald-300 font-black">::</span>&nbsp;결과
          크기&nbsp;
          <span className="text-emerald-300 font-black"> ::</span>
        </p>
        <p className="mx-auto">{` ${calculateDimensions()}`}</p>
      </div>
    </div>
  );
}
