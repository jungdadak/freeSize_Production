// lib/redux/slices/fileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FileType {
  id: string;
  name: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

interface FileState {
  file: FileType | null; // ✅ 한 개의 이미지만 저장
}

const initialState: FileState = {
  file: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<FileType>) => {
      state.file = action.payload; // ✅ 파일 덮어쓰기
    },
    clearFile: (state) => {
      state.file = null;
    },
  },
});

export const { setFile, clearFile } = fileSlice.actions;
export default fileSlice.reducer;
