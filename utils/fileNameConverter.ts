import slugify from 'slugify';

/**
 * 파일 확장자를 제거해주는 함수입니다.
 * @param filename
 * @returns 확장자 제거한 filename
 */
export const removeExtension = (filename: string): string => {
  return filename.split('.').slice(0, -1).join('.');
};

/**
 * @param filename
 * @returns 특수문자를 핸들링하는 slugify 라이브러리의 함수 활용한 함수
 * 파일명을 이쁘게 만들어 줍니다.
 * 파일 확장자를 제거해주는 함수도 활용하여 궁극의 안정적인 이름 획득가능함ㅅㄱ
 */
export const sanitizeFileName = (filename: string): string => {
  const nameWithoutExt = removeExtension(filename);

  // slugify로 특수문자 처리 (언더바를 하이픈으로 변환)
  return slugify(nameWithoutExt, {
    lower: true, // 소문자로 변환
    trim: true, // 앞뒤 공백 제거
    remove: /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/g,
  });
};
