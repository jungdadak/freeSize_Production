// imageUtils.ts
import JSZip from "jszip";
import {saveAs} from "file-saver";

/**
 * Blob URL을 Canvas에 로드하여 다른 형식으로 변환
 * @param blobUrl - 변환할 Blob URL
 * @param format - 'blob', 'canvas', 'jpeg', 'webp' 등 변환할 형식
 * @param quality - 이미지 품질 (0.0 ~ 1.0)
 * @returns 변환된 결과
 */
export const convertBlobToFormat = async (
    blobUrl: string,
    format: 'blob' | 'canvas' | 'jpeg' | 'webp',
    quality: number = 0.9
): Promise<Blob | HTMLCanvasElement | null> => {
    try {
        // Blob URL에서 이미지 가져오기
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        // 이미지를 Canvas에 그리기
        const img = new Image();
        const canvas = document.createElement('canvas');

        return new Promise<Blob | HTMLCanvasElement | null>((resolve) => {
            // 메모리 누수 방지를 위해 onload 후 URL 해제 추가
            img.onload = function () {
                URL.revokeObjectURL(img.src);

                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    console.error('Canvas 2D 컨텍스트를 가져올 수 없습니다');
                    resolve(null);
                    return;
                }

                ctx.drawImage(img, 0, 0);

                if (format === 'blob') {
                    resolve(blob);
                } else if (format === 'canvas') {
                    resolve(canvas);
                } else if (format === 'webp') {
                    canvas.toBlob(
                        (webpBlob) => resolve(webpBlob),
                        'image/webp',
                        quality
                    );
                } else if (format === 'jpeg') {
                    canvas.toBlob(
                        (jpegBlob) => resolve(jpegBlob),
                        'image/jpeg',
                        quality
                    );
                } else {
                    resolve(null);
                }
            };

            img.onerror = () => {
                console.error('이미지 로드 실패');
                resolve(null);
            };

            // Blob에서 임시 URL 생성하여 이미지 로드
            const tempUrl = URL.createObjectURL(blob);
            img.src = tempUrl;
        });
    } catch (error) {
        console.error('변환 오류:', error);
        return null;
    }
};

/**
 * 이미지 다운로드 함수
 * @param blob - 다운로드할 Blob 데이터
 * @param fileName - 저장할 파일 이름 (확장자 포함)
 */
export const downloadBlob = (blob: Blob | null, fileName: string): void => {
    if (!blob) return;
    saveAs(blob, fileName);
};

/**
 * Blob URL을 특정 형식으로 변환하여 다운로드
 * @param blobUrl - 원본 Blob URL
 * @param format - 변환할 형식 ('png', 'jpg', 'webp')
 * @param fileName - 파일 이름 (확장자 제외)
 * @param quality - 이미지 품질 (0.0 ~ 1.0)
 */
export const downloadImageAs = async (
    blobUrl: string,
    format: string,
    fileName: string,
    quality: number = 0.9
): Promise<void> => {
    let blob: Blob | HTMLCanvasElement | null = null;

    switch (format.toLowerCase()) {
        case 'png':
            blob = await convertBlobToFormat(blobUrl, 'blob');
            break;
        case 'jpg':
        case 'jpeg':
            blob = await convertBlobToFormat(blobUrl, 'jpeg', quality);
            break;
        case 'webp':
            blob = await convertBlobToFormat(blobUrl, 'webp', quality);
            break;
        default:
            console.error('지원하지 않는 형식:', format);
            return;
    }

    if (blob instanceof Blob) {
        downloadBlob(blob, `${fileName}.${format}`);
    }
};

/**
 * 여러 형식의 이미지를 ZIP으로 압축하여 다운로드
 * @param blobUrl - 원본 Blob URL
 * @param fileName - 기본 파일 이름 (확장자 제외)
 * @param formats - 포함할 형식 배열 ['png', 'jpg', 'webp']
 * @param quality - 이미지 품질 (0.0 ~ 1.0)
 * @returns 다운로드 성공 여부
 */
export const downloadAsZip = async (
    blobUrl: string,
    fileName: string,
    formats: string[] = ['png', 'jpg', 'webp'],
    quality: number = 0.9
): Promise<boolean> => {
    try {
        const zip = new JSZip();

        // 각 형식 변환 및 추가
        for (const format of formats) {
            let blob: Blob | HTMLCanvasElement | null = null;

            if (format === 'png') {
                blob = await convertBlobToFormat(blobUrl, 'blob');
            } else if (format === 'jpg' || format === 'jpeg') {
                blob = await convertBlobToFormat(blobUrl, 'jpeg', quality);
            } else if (format === 'webp') {
                blob = await convertBlobToFormat(blobUrl, 'webp', quality);
            }

            if (blob instanceof Blob) {
                zip.file(`${fileName}.${format}`, blob);
            }
        }

        // ZIP 생성 및 다운로드
        const zipBlob = await zip.generateAsync({type: 'blob'});
        downloadBlob(zipBlob, `${fileName}_images.zip`);

        return true;
    } catch (error) {
        console.error('ZIP 생성 오류:', error);
        return false;
    }
};