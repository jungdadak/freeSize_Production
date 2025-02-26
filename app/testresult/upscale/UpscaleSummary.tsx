import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Downloader from "@/components/Btn/Downloader";

interface UpscaleSummaryProps {
    fileName: string
    originDimension: string
    resultDimension: string
    resultUrl: string
}

export default function UpscaleSummary({fileName, originDimension, resultDimension, resultUrl}: UpscaleSummaryProps) {
    return (<>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Process Summary</CardTitle>
                <CardDescription>Congratulations !</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        File Name : {fileName}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        Origin Dimension : {originDimension}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        result Dimension : {resultDimension}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Downloader
                    blobUrl={resultUrl}
                    imageName={fileName}
                /> </CardFooter>
        </Card>
    </>)
}