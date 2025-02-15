export interface ProcessResponse {
  code: number;
  message: string;
  url: string;
}

interface HealthCheckRequest {
  formData: FormData;
  method: string;
  taskId: string;
  options: string;
}

export const imageProcessApi = {
  // AI 모델 헬스체크 요청
  healthCheck: async ({
    formData,
    method,
    taskId,
    options,
  }: HealthCheckRequest) => {
    const optionParam = {
      upscale: 'upscaleRatio',
      uncrop: 'targetRatio',
      square: 'targetRes',
    }[method];

    const response = await fetch(
      `/api/testone?taskId=${taskId}&${optionParam}=${options}&method=${method}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) throw new Error('AI 모델 체크 실패');
    return response.json() as Promise<ProcessResponse>;
  },

  pollingStatus: async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      // 아직 이미지가 없는 경우 - 정상적인 폴링 상황
      return { status: 'processing' };
    }
    // 이미지가 있는 경우
    return { status: 'completed', data: await response.json() };
  },
};
