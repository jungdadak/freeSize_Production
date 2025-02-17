// hooks/useFileProcessing.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateTaskStage } from '@/store/processSlice';
import { initializeFileProcess } from '@/store/thunk/initializeFileProcess.thunk';
import { FileMethod } from '@/types/Options';

/**----------------------------<파일 처리 커스텀 훅>-----------------------------
 * Tanstack Query 뮤테이션 사용
 * onMutate, onSuccess, onError시 리덕스 슬라이스 업데이트
 */
export function useFileProcessing(submitDataId: string | undefined) {
  const dispatch = useAppDispatch();

  const healthCheckMutation = useMutation({
    mutationFn: async (params: {
      formData: FormData;
      method: FileMethod;
      taskId: string;
      options: string;
    }) => {
      const url = new URL('/api/testone', window.location.origin);
      url.searchParams.append('taskId', params.taskId);
      url.searchParams.append('method', params.method);
      url.searchParams.append('options', params.options);

      const response = await fetch(url, {
        method: 'POST',
        body: params.formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Health check failed');
      }

      return response.json();
    },
    // 요청 시작 전에 실행: 'health' 단계로 상태 업데이트
    onMutate: async (variables) => {
      //리덕스 미들웨어로 넘겨야 해서 dispatch를 또 써야 한다고 한다. 그렇데.
      await dispatch(initializeFileProcess(submitDataId!, variables.taskId));
    },

    // 요청 성공 시 실행: 'healthGood' 단계로 상태 업데이트
    onSuccess: (data, variables, context) => {
      dispatch(
        updateTaskStage({
          taskId: variables.taskId,
          stage: 'healthGood',
        })
      );
      //요청성공 및 code ===200 수신시 polling으로 전환
      if (data.code === 200) {
        dispatch(
          updateTaskStage({
            taskId: variables.taskId,
            stage: 'polling',
          })
        );
      }
    },

    // 요청 실패 시 실행: 'healthBad' 단계로 상태 업데이트
    onError: (error, variables, context) => {
      dispatch(
        updateTaskStage({
          taskId: variables.taskId,
          stage: 'healthBad',
        })
      );
    },
  });

  return {
    processFile: healthCheckMutation.mutateAsync,
    isProcessing: healthCheckMutation.isPending,
  };
}
