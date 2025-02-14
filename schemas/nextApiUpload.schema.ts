import { FileMethod, FileOption, optionsMap } from '@/types/Options';
import { z } from 'zod';
import { fileSchema } from './imageUpload.schema';

/**
 * zod 의 enum메서드는 튜플을 강제하기 때문에 튜플로 타입 assertion
 */
export const methodSchema = z.enum(['upscale', 'uncrop', 'square'] as [
  FileMethod,
  ...FileMethod[]
]);

/**
 * optionsMap에 메서드별 옵션이 할당되어 있으므로
 * enum 튜플로 할당하여 메서드-옵션 관계 강제
 */
export const optionsSchema = z.object({
  upscale: z.enum(optionsMap.upscale as [FileOption, ...FileOption[]]),
  uncrop: z.enum(optionsMap.uncrop as [FileOption, ...FileOption[]]),
  square: z.enum(optionsMap.square as [FileOption, ...FileOption[]]),
});

/**
 * 스프링 서버로 api요청을 보낼 경우 활용하는 테스트
 * taskId: 값이 있는지 확인
 * method: 지정된 메소드(upscale, uncrop, square)중 하나인지 확인
 * options: optionsMap에 정의된 옵션값 중 하나인지 확인
 * superRefine : refine과 달리 두가지이상의 검증, 에러메시지 가능
 */
export const apiRequestSchema = fileSchema.extend({
  taskId: z.string().min(1, '태스크 ID는 필수입니다'),
  method: methodSchema,
  options: z.string().superRefine((val, ctx) => {
    const allOptions = Object.values(optionsMap).flat();
    if (!allOptions.includes(val as FileOption)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바르지 않은 옵션값입니다',
      });
    }
  }),
});
