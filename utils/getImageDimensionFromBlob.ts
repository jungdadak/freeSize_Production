export interface ImageDimensions {
    naturalWidth: number;
    naturalHeight: number;
}

export function getImageDimensions(src: string): Promise<ImageDimensions> {
    return new Promise<ImageDimensions>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
            resolve({naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight});
        };
        img.onerror = reject;
        img.src = src;
    });
}