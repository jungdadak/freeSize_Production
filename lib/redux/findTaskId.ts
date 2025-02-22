import {RootState} from "@/lib/redux/store";

/**
 * file 슬라이스에서 파일아이디로 taskId 찾는 함수
 * todo: 배치프로세싱 진행시 로직 변경해야됨
 * @param state
 * @param fileId
 */
export const selectTaskIdByFileId = (state: RootState, fileId: string): string | undefined => {

    return Object.keys(state.process).find(
        (taskId) => state.process[taskId].fileId === fileId
    );
};