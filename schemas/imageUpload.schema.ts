// schemas/imageUpload.schema.ts
import { z } from 'zod';

// ✅ 개별 이미지 검증 (파일 확장자, 크기 제한)
export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5 * 1024 * 1024, '파일 크기는 최대 5MB까지 가능합니다.'),
  type: z.string().refine((type) => type.startsWith('image/'), {
    message: '이미지 파일만 업로드 가능합니다.',
  }),
});

// ✅ 1개의 파일만 허용 (배열 형태)
export const singleFileSchema = z
  .array(fileSchema)
  .length(1, '이미지 1장만 업로드 가능합니다.');
