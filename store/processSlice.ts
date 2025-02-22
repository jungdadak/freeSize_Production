import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * 파일 처리 시작시 3가지 상태를 정의합니다.
 * healthCheck, Polling, Result 별로 상태관리
 */

export interface ProcessInfo {
  fileId: string; // fileSlice의 fileid를 FK로 참조
  stage:
      | 'notStarted'
      | 'health'
      | 'healthGood'
      | 'healthBad'
      | 'polling'
      | 'pollingGood'
      | 'pollingBad'
      | 'success'
      | 'fail';
  result?:string;
}

interface ProcessState {
  [taskId: string]: ProcessInfo;
}

const initialState: ProcessState = {};

export const processSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    // 태스크 추가: 새로운 태스크를 'notStarted' 단계로 추가, fileId를 추가
    addTask: (
        state,
        action: PayloadAction<{ taskId: string; fileId: string }>
    ) => {
      const { taskId, fileId } = action.payload;
      if (!state[taskId]) {
        state[taskId] = {
          fileId,
          stage: 'notStarted',
        };
      }
    },
    // 태스크의 단계 업데이트: 특정 태스크의 stage를 변경
    updateTaskStage: (
        state,
        action: PayloadAction<{
          taskId: string;
          stage: ProcessInfo['stage'];
          result?: string;  // result를 선택적 파라미터로 추가
        }>
    ) => {
      const { taskId, stage, result } = action.payload;
      if (state[taskId]) {
        state[taskId].stage = stage;
        // result가 제공된 경우에만 업데이트
        if (result !== undefined) {
          state[taskId].result = result;
        }
      }
    },
    // 특정 태스크 삭제: 특정 taskId를 가진 태스크 삭제
    removeTask: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    // 모든 태스크 삭제: state의 모든 태스크를 제거
    clearTasks: (state) => {
      Object.keys(state).forEach((taskId) => {
        delete state[taskId];
      });
    },
  },
});

export const { addTask, updateTaskStage, clearTasks, removeTask } =
    processSlice.actions;
export default processSlice.reducer;