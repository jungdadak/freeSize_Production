import {createAsyncThunk} from '@reduxjs/toolkit';
import {clearTasks} from "@/store/processSlice";
import {clearFile} from "@/store/fileSlice";

// 모든 상태를 한 번에 초기화하는 Thunk
export const superClearAll = createAsyncThunk(
    'app/clearAllData',
    async (_, {dispatch}) => {
        // processSlice의 clearTasks 액션 디스패치
        dispatch(clearTasks());

        // fileSlice의 clearFile 액션 디스패치
        dispatch(clearFile());

        // 필요하다면 추가 작업 수행
        return {success: true};
    }
);