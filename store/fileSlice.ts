// lib/redux/slices/fileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//-----------<3가지 기능별 리터럴 타입 지정>--------- + enum 방식은 런타임 오버헤드가있답니다.

export interface UpscaleOption {
  method: 'upscale';
  options: 'x1' | 'x2' | 'x4';
}

export interface UncropOption {
  method: 'uncrop';
  options: '1:2' | '2:1';
}
export interface SquareOption {
  method: 'square';
  options: '768' | '1024' | '1536';
}

//------------------------------------------

export interface FileType {
  id: string;
  name: string;
  size: number;
  url: string;
  width: number;
  height: number;
  option?: UpscaleOption | UncropOption | SquareOption;
  taskId?: string;
}

interface FileState {
  file: FileType | null; // 한 개의 이미지만 저장
}

const initialState: FileState = {
  file: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<FileType>) => {
      state.file = action.payload; // 파일 생성옵션 ( 전부 덮어쓰기 )
    },
    setFileOption: (
      state,
      action: PayloadAction<UpscaleOption | UncropOption | SquareOption>
    ) => {
      if (state.file) {
        state.file.option = action.payload; // 옵션만 업데이트
      }
    },
    clearFileOption: (state) => {
      if (state.file) {
        state.file.option = undefined; // 옵션만 초기화
      }
    },
    clearFile: (state) => {
      state.file = null;
    },
    setFileTaskId: (state, action: PayloadAction<string>) => {
      if (state.file) {
        state.file.taskId = action.payload;
      }
    },
  },
});

export const { setFile, clearFile, setFileOption, clearFileOption } =
  fileSlice.actions;

export default fileSlice.reducer;
