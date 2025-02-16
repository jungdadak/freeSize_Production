'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { clearFile, setFileOption } from '@/store/fileSlice';
import { Button } from '@/components/ui/button';
import type {
  UpscaleOption,
  UncropOption,
  SquareOption,
} from '@/store/fileSlice';
import { FileOptionResult } from '@/utils/calculateDimension';
import { FileMethod, FileOption, optionsMap } from '@/types/Options';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { addTask, clearTasks, updateTaskStage } from '@/store/processSlice';
import { initializeFileProcess } from '@/store/thunk/initializeFileProcess.thunk';

export default function FileOptionSelector() {
  //------<타입 지정한 커스텀 리덕스훅 가져오기>----------------
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.file.file?.option); //여기선 아직 파일 없을수도 있어서 옵셔널체이닝
  /**
   * 제출할 데이터형식을 리덕스 상태에서부터 정의
   * id, name, bloburl, method, options 를 가져옴
   */
  const submitData = useAppSelector((state) => ({
    id: state.file.file?.id,
    name: state.file.file?.name,
    originBlob: state.file.file?.url,
    method: state.file.file?.option?.method,
    options: state.file.file?.option?.options,
  }));

  /**
   * 이미지의 높낮이는 이미지 미리보기시 필요하므로 별도로 킵
   */
  const [width, height] = useAppSelector((state) => [
    state.file.file?.width,
    state.file.file?.height,
  ]);

  // useState로 메서드 정의, 기본값은 upscale로, 옵션은 레코드에서 가져와서 어긋나지 않게 매핑
  const [method, setMethod] = useState<FileMethod>('upscale');
  const options = optionsMap[method];

  /**
   * 라디오 체크박스 누를 경우 실행되는 함수
   * 리덕스 저장소 선택된 메서드와 옵션으로 업데이트
   */
  const handleOptionSelect = (option: FileOption) => {
    dispatch(
      setFileOption({ method, options: option } as
        | UpscaleOption
        | UncropOption
        | SquareOption)
    );
  };

  /**----------------------------<TanstackQuery 요청부분>-----------------------------
   * Tanstack Query 뮤테이션 사용
   * onMutate, onSuccess, onError시 리덕스 슬라이스 업데이트
   */
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
      await dispatch(initializeFileProcess(submitData.id!, variables.taskId));
    },

    // 요청 성공 시 실행: 'healthGood' 단계로 상태 업데이트
    onSuccess: (data, variables, context) => {
      dispatch(
        updateTaskStage({
          taskId: variables.taskId,
          stage: 'healthGood',
        })
      );
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

  /**----------------------------<시작 버튼 핸들러>-----------------------------
   * 시작 버튼 클릭시 제출
   * 데이터 이상 있을시 슬라이스 쵝화
   * 여기서 taskId를 생성합니다.
   */
  const handleSubmit = async () => {
    //
    if (
      !submitData.id ||
      !submitData.name ||
      !submitData.originBlob ||
      !submitData.method ||
      !submitData.options
    ) {
      alert('Sorry, 다시 시도해 주세요');
      dispatch(clearFile()); // 스토어 클리어하여 업로드폼 노출로 유도 (상태변화로 재랜더링됨ㅇㅇ)
      return;
    }

    try {
      const taskId = submitData.id + '-' + submitData.name; //taskId 생성

      const formData = new FormData();

      const blobResponse = await fetch(submitData.originBlob);
      //블롭파일 장전
      const blob = await blobResponse.blob();
      // 발사
      formData.append('file', blob, submitData.name);

      // TanstackQuery 소환, fetch요청 시작, 리덕스 업데이트는 tanstack코드에서 진행합니다.
      const result = await healthCheckMutation.mutateAsync({
        formData,
        method: submitData.method,
        taskId,
        options: submitData.options,
      });

      if (result.code === 200) {
        //TODO : 처리 성공 시 필요한 로직
      }
    } catch (error) {
      alert('SERVER ERROR : 죄송합니다 다시 시도해 주세요');
      URL.revokeObjectURL(submitData.originBlob); //블롭주소 해제
      dispatch(clearFile()); //파일 초기화
      dispatch(clearTasks()); //처리상태 초기화 (이미지가 한장뿐이니 전체삭제)
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-black">
      <div className="flex-none">
        <div className="flex justify-center space-x-2 mb-4">
          {(Object.keys(optionsMap) as FileMethod[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMethod(tab)}
              className={`px-4 py-2 rounded-xl transition-all ${
                method === tab
                  ? 'bg-orange-500 text-white dark:bg-yellow-500 dark:text-black'
                  : 'bg-yellow-200 text-gray-800 dark:bg-gray-800 dark:text-yellow-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative w-5 h-5">
              <input
                type="radio"
                name="file-option"
                value={option}
                checked={selectedOption?.options === option}
                onChange={() => handleOptionSelect(option)}
                className="sr-only peer"
              />
              <div className="absolute w-5 h-5 border transition-colors peer-checked:border-yellow-600 peer-checked:dark:border-orange-600 border-gray-400 rounded-sm bg-white dark:bg-black" />
              <div className="absolute w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-yellow-600 dark:stroke-orange-600 stroke-[3]"
                >
                  <polyline points="20 6 9 17 4 12" fill="none" />
                </svg>
              </div>
            </div>
            <span className="text-gray-900 dark:text-gray-100">{option}</span>
          </label>
        ))}
      </div>

      <div className="mt-auto">
        {selectedOption && (
          <>
            <FileOptionResult
              method={selectedOption.method}
              selectedOption={selectedOption.options}
              width={width}
              height={height}
            />
            <div className="mt-4">
              <Button
                onClick={handleSubmit}
                disabled={healthCheckMutation.isPending}
                className="w-full px-4 py-2 rounded-xl transition-all bg-orange-500 text-white dark:bg-yellow-500 dark:text-black hover:bg-orange-600 dark:hover:bg-yellow-600"
              >
                {healthCheckMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  '시 작'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
