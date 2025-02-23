import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAppSelector} from '@/lib/redux/hooks';
import {selectTaskIdByFileId} from '@/lib/redux/findTaskId';

export const useTestRedirectOnSuccess = () => {
    const router = useRouter();
    const file = useAppSelector((state) => state.file.file);

    const taskId = useAppSelector((state) =>
        file ? selectTaskIdByFileId(state, file.id) : undefined
    );

    const processInfo = useAppSelector((state) =>
        taskId ? state.process[taskId] : undefined
    );

    useEffect(() => {
        // setTimeout callBack 의 시점에 보장이 안될 수 있어 내로잉이 안되기 때문에 변수에 저장하여 사용
        const method = file?.option?.method;
        if (
            processInfo?.stage === 'success' &&
            file?.url &&
            method &&
            processInfo?.result
        ) {
            const queryParams = new URLSearchParams({
                originUrl: file.url,
                resultUrl: processInfo.result,
            }).toString();

            const timer = setTimeout(() => {
                router.push(`/testresult/${method}?${queryParams}`);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [
        processInfo?.stage,
        file?.url,
        file?.option?.method,
        processInfo?.result,
        router,
    ]);

};
