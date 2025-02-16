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

/**
 * 클라이언트가 보낸 폼 데이터를 받아와서 spring swagger 스펙에 맞춰 요청을 보냅니다.
 * 협업 편의성을 위해 zod 로 전송되는 데이터가 스키마 규격에 맞는지 재차검증합니다.
 * spring response는 변경될 수 있으므로 별도 검증을 수행하지 않습니다.
 */
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
    //--------< zod schema로 spring에 데이터 전달전 최종 점검>--------------
    const validatedData = apiRequestSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type,
      taskId: searchParams.get('taskId'),
      method: searchParams.get('method'),
      options: searchParams.get('options'),
    });
    //--------------------<Test Code>--------------------------
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        code: 200,
        message: 'wait',
        url: process.env.MOCK_HEALTH_SUCCESS_RESPONSE,
      });
    }

    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // 메소드에 따른 옵션 파라미터 이름 사용
    const optionParam = optionParamMap[validatedData.method];

    const response = await fetch(
      `${process.env.SPRING_BACKEND_URL}/${validatedData.method}?taskId=${validatedData.taskId}&${optionParam}=${validatedData.options}`,
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
    //zod에러 발생은 클라이언트쪽에서 무언가 이상행동을 했을 가능성이 높아 400처리
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
