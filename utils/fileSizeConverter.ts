/**
 * 바이트 크기를 읽기 쉬운 형식으로 변환합니다. (B, KB, MB)
 * @param bytes - 변환할 바이트 크기
 * @param decimals - 소수점 자릿수 (기본값: 2)
 * @returns 변환된 크기 문자열 (예: '1.5 MB', '900 KB')
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];

  // 1024로 나눌 수 있는 최대 횟수 계산 (즉, 적절한 단위 찾기)
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // 해당 단위로 바이트 변환
  const convertedSize = bytes / Math.pow(k, i);

  // 소수점 자릿수 처리
  return `${parseFloat(convertedSize.toFixed(decimals))} ${sizes[i]}`;
};
