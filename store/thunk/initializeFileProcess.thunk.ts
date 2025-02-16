import { AppDispatch } from '@/lib/redux/store';
import { addTask, updateTaskStage } from '../processSlice';

/**
 * 파일 처리 시작시 process 상태를 초기화하는 thunk
 * fileId를 받아 process 상태를 생성하고 health 단계로 설정합니다.
 * notStarted -> health로 순차적으로 변경해줌
 * @param fileId - 처리할 파일의 ID
 * @param taskId - 생성할 태스크의 ID
 * @returns process 상태 초기화 및 health 단계 설정
 */
export const initializeFileProcess = (fileId: string, taskId: string) => {
  return async (dispatch: AppDispatch) => {
    // process에 새 상태 생성 (fileId 포함)
    await dispatch(addTask({ taskId, fileId }));
    // health 단계로 업데이트
    await dispatch(
      updateTaskStage({
        taskId,
        stage: 'health',
      })
    );
  };
};
