import React, {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DownloadIcon} from "lucide-react";
import {PiFileJpgDuotone, PiFilePngDuotone, PiImagesSquareDuotone} from "react-icons/pi";
import {RiFolderZipLine} from "react-icons/ri";
import {Button} from "@/components/ui/button";
import {downloadAsZip, downloadImageAs} from "@/utils/imageConverter"
import {toast} from "sonner"


interface DownloaderProps {
    blobUrl: string;
    imageName?: string;
}

const Downloader: React.FC<DownloaderProps> = ({
                                                   blobUrl,
                                                   imageName = "image"
                                               }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // PNG 다운로드
    const handlePngDownload = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await downloadImageAs(blobUrl, 'png', imageName);
            toast.success("다운로드 완료!")

        } catch {
            toast.error("PNG 변환 오류!")

        } finally {
            setIsLoading(false);
        }
    };

    // JPG 다운로드
    const handleJpgDownload = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await downloadImageAs(blobUrl, 'jpg', imageName, 0.9);
            toast.success("다운로드 성공!")
        } catch {
            toast.error("JPG 변환 오류!")
        } finally {
            setIsLoading(false);
        }
    };

    // WebP 다운로드
    const handleWebpDownload = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await downloadImageAs(blobUrl, 'webp', imageName, 0.9);
            toast.success("다운로드 성공!")
        } catch {
            toast.error("WebP 변환 오류")

        } finally {
            setIsLoading(false);
        }
    };

    // ZIP 압축 다운로드
    const handleZipDownload = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await downloadAsZip(blobUrl, imageName, ['png', 'jpg', 'webp']);
            toast("다운로드 성공!")

        } catch (error) {
            console.error('ZIP 생성 오류:', error);
            toast("ZIP 파일 생성 실패!")

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                    <DownloadIcon className="mr-2 h-4 w-4"/>
                    {isLoading ? '처리 중...' : '다운로드'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>다운로드 옵션</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handlePngDownload}>
                    <PiFilePngDuotone className="mr-2 h-4 w-4"/> PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleJpgDownload}>
                    <PiFileJpgDuotone className="mr-2 h-4 w-4"/> JPG(JPEG)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleWebpDownload}>
                    <PiImagesSquareDuotone className="mr-2 h-4 w-4"/> WebP
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleZipDownload}>
                    <RiFolderZipLine className="mr-2 h-4 w-4"/> ZIP
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Downloader;