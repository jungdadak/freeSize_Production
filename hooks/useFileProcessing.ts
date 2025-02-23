// hooks/useFileProcessing.ts
'use client';

import {useMutation} from '@tanstack/react-query';
import {useAppDispatch} from '@/lib/redux/hooks';
import {updateTaskStage} from '@/store/processSlice';
import {initializeFileProcess} from '@/store/thunk/initializeFileProcess.thunk';
import {FileMethod} from '@/types/Options';
import {useRef} from "react";

const DELAY = {
    STATE_TRANSITION: 500,    // 상태 전환 딜레이
    POLLING_MAX: 40000,      // 40초 제한
    COLD_START: 5000,        // 첫 시도 5초
    INTERVAL: 5000,          // 이후 5초 간격
} as const;


/**----------------------------<파일 처리 커스텀 훅>-----------------------------
 * Tanstack Query 뮤테이션 사용
 * onMutate, onSuccess, onError시 리덕스 슬라이스 업데이트
 */
export function useFileProcessing(submitDataId: string | undefined) {
    const dispatch = useAppDispatch();

    const pollingStartTimeRef = useRef<number | null>(null);

    const handlePollingError = async (taskId: string, errorMessage: string) => {
        try {
            dispatch(updateTaskStage({
                taskId,
                stage: 'pollingBad',
            }));
            dispatch(updateTaskStage({
                taskId,
                stage: 'fail',
            }));
        } catch (dispatchError) {
            console.error('폴링 에러 처리 중 상태 업데이트 실패:', dispatchError);
        } finally {
            pollingStartTimeRef.current = null;
        }
        return Promise.reject(new Error(errorMessage));
    };

    const performPolling = async (taskId: string, retryCount = 0) => {
        try {
            console.log(`🔄 폴링 시도 ${retryCount + 1}회차 시작`);

            if (
                pollingStartTimeRef.current &&
                Date.now() - pollingStartTimeRef.current > DELAY.POLLING_MAX
            ) {
                console.log('⚠️ 폴링 타임아웃 발생');
                return await handlePollingError(taskId, 'TIMEOUT');
            }

            // 첫 시도는 콜드스타트 대기
            if (retryCount === 0) {
                console.log(`⏳ 콜드스타트 대기 ${DELAY.COLD_START}ms`);
                await new Promise(resolve => setTimeout(resolve, DELAY.COLD_START));
            }

            const response = await fetch(`/api/polling/${taskId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                },
            });

            if (!response.ok) {
                const message = response.status === 404 ? 'EXPIRED' : '폴링 실패';
                return await handlePollingError(taskId, message);
            }

            const contentType = response.headers.get('Content-Type');

            // 이미지나 바이너리 데이터인 경우
            if (contentType?.startsWith('image/') || contentType === 'binary/octet-stream') {
                console.log('✅ 이미지 응답 수신');

                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);

                dispatch(updateTaskStage({
                    taskId,
                    stage: 'pollingGood',
                    result: imageUrl,
                }));

                dispatch(updateTaskStage({
                    taskId,
                    stage: 'success',
                }));

                pollingStartTimeRef.current = null;
                return imageUrl;
            }

            // JSON 응답인 경우 (pending 등)
            const text = await response.text();  // 먼저 텍스트로 읽고
            try {
                const data = JSON.parse(text);  // JSON 파싱 시도
                if (data.message === 'pending') {

                    if (retryCount >= 7) {
                        console.log('⚠️ 최대 재시도 횟수 초과');

                        return await handlePollingError(taskId, 'TIMEOUT');
                    }

                    console.log(`⏳ Pending 상태, ${DELAY.INTERVAL}ms 후 재시도`);

                    await new Promise(resolve => setTimeout(resolve, DELAY.INTERVAL));
                    return performPolling(taskId, retryCount + 1);
                }
                return await handlePollingError(taskId, data.message || '알 수 없는 오류');
            } catch {
                return await handlePollingError(taskId, '응답 형식 오류');
            }
        } catch (error) {
            return await handlePollingError(taskId, (error as Error)?.message || '폴링 실패');
        }
    };


    /**
     * 헬스체크시 testone 엔드포인트에 요청하는 mutation
     * taskId, method, options 는 쿼리파라미터로 담아서 전송
     * body 에 파일 바이너리 데이터 전송
     * notStarted->Polling 까지 상태변화 유발
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

            // 응답 홀딩
            const response = await fetch(url, {
                method: 'POST',
                body: params.formData,
            });

            //에러 핸들링
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'failed healthCheck');
            }

            // 성공시 응답값 반환 (code 값만 반환받음.)
            const data = await response.json();
            console.log('mutationFn raw response:', data);  // 응답 데이터 확인
            return data;
        },
        // 요청 시작 전에 실행: 'health' 단계로 상태 업데이트
        onMutate: async (variables) => {
            //리덕스 미들웨어로 넘겨야 해서 dispatch를 또 써야 한다고 한다. 그렇데.
            await dispatch(initializeFileProcess(submitDataId!, variables.taskId));
        },

        // 요청 성공 시 실행: 'healthGood' 단계로 상태 업데이트
        onSuccess: (data, variables) => {
            dispatch(
                updateTaskStage({
                    taskId: variables.taskId,
                    stage: 'healthGood',
                })
            );
            //요청성공 및 code ===200 수신시 polling으로 전환
            console.log('healthGood 이후 data:', data);
            console.log('code 타입:', typeof data.code);
            console.log('code 값:', data.code);
            if (data.code === 200) {
                console.log('polling 상태로 전환 시도');

                console.log('code is 200, transitioning to polling')
                dispatch(
                    updateTaskStage({
                        taskId: variables.taskId,
                        stage: 'polling',
                    })
                )
                performPolling(variables.taskId).catch(error => {
                    console.error('Polling failed:', error);
                });
            }
        },

        // 요청 실패 시 실행: 'healthBad' 단계로 상태 업데이트
        onError: (error, variables) => {
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
