'use client';
import { imageProcessApi, ProcessResponse } from '@/lib/imageTest';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PROCESS_TIMES = {
  upscale: { min: 10, max: 40 },
  uncrop: { min: 20, max: 40 },
  square: { min: 20, max: 40 },
} as const;

export function useTestProcess() {
  const [pollingUrl, setPollingUrl] = useState<string | null>(null);

  const healthCheck = useMutation({
    mutationFn: imageProcessApi.healthCheck,
    onSuccess: (data: ProcessResponse) => {
      setPollingUrl(data.url);
    },
  });

  const pollingStatus = useQuery({
    queryKey: ['pollingStatus', pollingUrl],
    queryFn: () => imageProcessApi.pollingStatus(pollingUrl!),
    enabled: !!pollingUrl,
    refetchInterval: 4000,
    retry: 10, // 40초 동안 시도
    retryDelay: 4000,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    healthCheck,
    pollingStatus,
    pollingUrl,
    resetPolling: () => setPollingUrl(null),
    processTimes: PROCESS_TIMES,
  };
}
