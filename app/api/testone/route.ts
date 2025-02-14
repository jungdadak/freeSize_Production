import { NextRequest, NextResponse } from 'next/server';
import { apiRequestSchema } from '@/schemas/nextApiUpload.schema';
import { z } from 'zod';
import { FileMethod } from '@/types/Options';

// 메소드별 옵션 파라미터 이름 매핑
const optionParamMap: Record<FileMethod, string> = {
  upscale: 'upscaleRatio',
  uncrop: 'targetRatio',
  square: 'targetRes',
};

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: '파일이 없거나 잘못된 형식입니다' },
        { status: 400 }
      );
    }

    const validatedData = apiRequestSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type,
      taskId: searchParams.get('taskId'),
      method: searchParams.get('method'),
      options: searchParams.get('options'),
    });

    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // 메소드에 따른 옵션 파라미터 이름 사용
    const optionParam = optionParamMap[validatedData.method];

    const response = await fetch(
      `${process.env.BACKEND_URL}/${validatedData.method}?taskId=${validatedData.taskId}&${optionParam}=${validatedData.options}`,
      {
        method: 'POST',
        body: backendFormData,
      }
    );

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다' },
      { status: 500 }
    );
  }
}
