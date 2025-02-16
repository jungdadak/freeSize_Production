'use client';
import { useFileProcessRef } from '@/hooks/useFileProcessRef';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { clearFile } from '@/store/fileSlice';
import { clearTasks } from '@/store/processSlice';
import { Check, Activity, Wifi, XCircle } from 'lucide-react';

/**
 * 처리 단계별로 ui를 랜더링 합니다.
 * health -> polling -> succes/fail 순으로 Ui 상태를 변환시킵니다.
 * 삼항연산자 떡칠된 코드
 */
const ProcessStatus = () => {
  const dispatch = useAppDispatch();
  const file = useAppSelector((state) => state.file.file);

  const currentProcess = useFileProcessRef(file?.id);

  // 없으면 얘가 랜더링된게 잘못이니 스토어들 그냥 클리어함
  if (!currentProcess) {
    dispatch(clearFile());
    dispatch(clearTasks());
    return;
  }

  const currentStep = currentProcess.stage;

  // 헬스체크 상태
  const isHealthActive = currentStep === 'health';
  const isHealthFailed = currentStep === 'healthBad';
  const isHealthSuccess =
    currentStep === 'healthGood' ||
    currentStep === 'polling' ||
    currentStep === 'pollingGood' ||
    currentStep === 'pollingBad' ||
    currentStep === 'success' ||
    currentStep === 'fail';

  // 프로세스(폴링) 상태
  const isProcessingActive = currentStep === 'polling';
  const isProcessingSuccess =
    currentStep === 'pollingGood' ||
    (currentStep === 'success' && !isHealthFailed);
  const isProcessingFailed =
    currentStep === 'pollingBad' || (currentStep === 'fail' && !isHealthFailed);

  // 최종 결과 상태
  const isFinalSuccess =
    currentStep === 'pollingGood' || currentStep === 'success';
  const isFinalFailed =
    currentStep === 'healthBad' ||
    currentStep === 'pollingBad' ||
    currentStep === 'fail';

  return (
    <div className="flex flex-col items-center space-y-8 w-[270px] p-4">
      {/* 헬스체크 상태 */}
      <div className="flex items-center space-x-3">
        <div
          className={`p-3 rounded-full ${
            isHealthActive
              ? 'bg-yellow-100 dark:bg-yellow-900/30 animate-pulse'
              : isHealthFailed
              ? 'bg-red-100 dark:bg-red-900/30'
              : isHealthSuccess
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-gray-100 dark:bg-gray-900/30'
          }`}
        >
          {isHealthFailed ? (
            <XCircle className="w-6 h-6 text-red-500" />
          ) : (
            <Activity
              className={`w-6 h-6 ${
                isHealthActive
                  ? 'text-yellow-500 animate-pulse'
                  : isHealthSuccess
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}
            />
          )}
        </div>
        <span className="text-gray-700 dark:text-gray-300">Health-Check</span>
      </div>

      {/* 프로세스(폴링) 상태 */}
      <div className="flex items-center space-x-3">
        <div
          className={`p-3 rounded-full ${
            isProcessingActive
              ? 'bg-yellow-100 dark:bg-yellow-900/30 animate-pulse'
              : isProcessingSuccess
              ? 'bg-green-100 dark:bg-green-900/30'
              : isProcessingFailed
              ? 'bg-red-100 dark:bg-red-900/30'
              : 'bg-gray-100 dark:bg-gray-900/30'
          }`}
        >
          {isProcessingFailed ? (
            <XCircle className="w-6 h-6 text-red-500" />
          ) : isProcessingActive ? (
            <Wifi className="w-6 h-6 text-yellow-500 animate-pulse" />
          ) : isProcessingSuccess ? (
            <Wifi className="w-6 h-6 text-green-500" />
          ) : (
            <Wifi className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <span className="text-gray-700 dark:text-gray-300">
          {isProcessingFailed
            ? 'Processing Failed'
            : isProcessingActive
            ? 'Processing'
            : isProcessingSuccess
            ? 'Processing Completed'
            : 'Processing Pending'}
        </span>
      </div>

      {/* 최종 결과 상태 */}
      <div className="flex items-center space-x-3">
        <div
          className={`p-3 rounded-full ${
            isFinalSuccess
              ? 'bg-green-100 dark:bg-green-900/30'
              : isFinalFailed
              ? 'bg-red-100 dark:bg-red-900/30'
              : 'bg-gray-100 dark:bg-gray-900/30'
          }`}
        >
          {isFinalFailed ? (
            <XCircle className="w-6 h-6 text-red-500" />
          ) : isFinalSuccess ? (
            <Check className="w-6 h-6 text-green-500" />
          ) : (
            <Check className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <span className="text-gray-700 dark:text-gray-300">
          {isFinalFailed ? 'Failed' : isFinalSuccess ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default ProcessStatus;
