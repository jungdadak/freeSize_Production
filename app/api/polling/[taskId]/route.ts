import redis from '@/lib/redis/redis';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 서버리스로 실행될 폴링 api 입니다.
 * 폴링 로직은 클라이언트에서 관리하며, redis 조회, s3조회 및 파이핑 수행합니다.
 * pending 응답을 하거나 image데이터를 파이핑합니다.
 * @param request
 * @param dynamicRoute taskId값
 * @returns message +(file stream)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;

  const s3url = await redis.get(taskId);
  //redis 5분 expire 설정이 동작한 것이므로 (-2)
  if (!s3url) {
    return NextResponse.json(
      {
        message: '시간이 너무 많이 흘렀습니다. 다시 시도해 주세요',
      },
      {
        status: 404,
      }
    );
  }
  //main
  try {
    //head 요청으로 파일 존재 유무를 체크
    const s3Req = await fetch(s3url, {
      method: 'HEAD',
    });
    //file 존재하지 않을 경우 200처리  및 pending (polling 유지용)
    if (!s3Req.ok) {
      return NextResponse.json({ message: 'pending' }, { status: 200 });
    }

    const s3FileRes = await fetch(s3url);
    if (!s3FileRes.ok || !s3FileRes.body) {
      return NextResponse.json(
        { message: '파일 데이터를 가져오는데 실패했습니다.' },
        { status: 500 }
      );
    }
    /**---------<이미지파일 스트리밍>-----------------
     * S3의 응답 헤더에서 Content-Type 등을 가져와 클라이언트 응답에 설정
     */
    const headers = new Headers();
    headers.set(
      'Content-Type',
      s3FileRes.headers.get('Content-Type') || 'application/octet-stream'
    );

    // 파일 데이터를 스트리밍하여 클라이언트에 응답
    return new NextResponse(s3FileRes.body, { headers });
  } catch (err) {
    console.error('Error in polling API:', err);
    return NextResponse.json(
      {
        message: '서버 에러 ',
      },
      { status: 500 }
    );
  }
}
