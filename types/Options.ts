export type FileMethod = 'upscale' | 'uncrop' | 'square';
export type FileOption = string;

export const optionsMap: Record<FileMethod, FileOption[]> = {
  upscale: ['x1', 'x2', 'x4'],
  uncrop: ['1:2', '2:1'],
  square: ['768', '1024', '1536'],
};

export const optionDescriptions: Record<FileMethod, Record<string, string>> = {
  upscale: {
    x1: '이미지가 샤프해집니다',
    x2: '해상도가 2배 향상됩니다',
    x4: '해상도가 4배 향상됩니다',
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
