'use client';
import { useAppSelector } from '@/lib/redux/hooks';

/**
 * file 과 process 슬라이스의 릴레이션을 찾는 훅임
 * 현재 프로세스를 알아야 하기에 (processSlice는 nested object 형태로 선언되어 있음 +  FK가 안쪽의 객체이 있음)
 * Object.entries 활용 -> 중첩배열을 어레이로 펼쳐줌, taskId(PK) 안쓰니까 언더바로 무시(컨벤션)
 * process 필드에서 {fileId, stage} fileId 가 fileSlice에서 파일아이디랑 똑같은놈을 찾아서 뱉음.
 * @returns [taskId, {fileId, stage}] || null
 */
export const useFileProcessRef = (fileId: string | undefined) => {
  return useAppSelector((state) => {
    if (!fileId) return null;
    return Object.entries(state.process).find(
      ([_, process]) => process.fileId === fileId
    )?.[1];
  });
};
