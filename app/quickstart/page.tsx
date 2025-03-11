'use client';

import { useState } from 'react';
import InteractivePannel from "@/components/Pannel/InteractivePannel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileImage, Settings, Download } from 'lucide-react';

export default function QuickStartPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-100 max-w-7xl mx-auto min-h-screen py-8 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-orange-500 mb-2">빠른 시작 가이드</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    이미지 처리 서비스를 시작하는 방법을 안내해 드립니다
                </p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>시작하기</CardTitle>
                    <CardDescription>
                        아래 단계를 따라 서비스 사용 방법을 알아보세요
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* 커스텀 스텝 표시기 */}
                    <div className="flex justify-between mb-6">
                        <div className={`flex flex-col items-center ${currentStep === 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 1 ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100 border border-gray-300'}`}>
                                <FileImage size={20} />
                            </div>
                            <span className="text-sm font-medium">이미지 업로드</span>
                            <span className="text-xs">파일 업로드</span>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className={`h-0.5 w-full ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        </div>

                        <div className={`flex flex-col items-center ${currentStep === 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 2 ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100 border border-gray-300'}`}>
                                <Settings size={20} />
                            </div>
                            <span className="text-sm font-medium">옵션 선택</span>
                            <span className="text-xs">처리 옵션 선택</span>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className={`h-0.5 w-full ${currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        </div>

                        <div className={`flex flex-col items-center ${currentStep === 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === 3 ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100 border border-gray-300'}`}>
                                <Download size={20} />
                            </div>
                            <span className="text-sm font-medium">결과 다운로드</span>
                            <span className="text-xs">이미지 저장</span>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6 mb-6">
                        {currentStep === 1 && (
                            <div>
                                <h3 className="text-lg font-medium mb-4">이미지 업로드</h3>
                                <div className="p-4 border-2 border-dashed border-orange-300 rounded-lg text-center dark:border-orange-600">
                                    <p className="mb-2">파일을 아래 패널에 드래그드랍하거나 직접 업로드하세요</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">지원 이미지 형식: SVG, PNG, JPG(JPEG), WEBP</p>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <h3 className="text-lg font-medium mb-4">처리 옵션 선택</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border rounded-lg p-4 hover:border-orange-400 cursor-pointer">
                                        <h4 className="font-medium">Upscale</h4>
                                        <p className="text-sm">이미지 해상도를 높이고 품질을 개선합니다</p>
                                    </div>
                                    <div className="border rounded-lg p-4 hover:border-orange-400 cursor-pointer">
                                        <h4 className="font-medium">Uncrop</h4>
                                        <p className="text-sm">이미지의 가장자리를 확장하여 더 넓은 뷰를 제공합니다</p>
                                    </div>
                                    <div className="border rounded-lg p-4 hover:border-orange-400 cursor-pointer">
                                        <h4 className="font-medium">Square</h4>
                                        <p className="text-sm">이미지를 정사각형 비율로 변환합니다</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-500 italic">설정 후 약 30초 정도 처리 시간이 소요됩니다</p>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <h3 className="text-lg font-medium mb-4">결과 다운로드</h3>
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <div className="flex-1 border rounded p-4 bg-gray-50 dark:bg-gray-800">
                                        <p className="text-sm mb-2 text-center">원본 이미지</p>
                                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                            <FileImage className="text-gray-400" size={48} />
                                        </div>
                                    </div>
                                    <div className="flex-1 border rounded p-4 bg-gray-50 dark:bg-gray-800">
                                        <p className="text-sm mb-2 text-center">처리된 이미지</p>
                                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                            <FileImage className="text-orange-400" size={48} />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-medium mb-2">다운로드 형식</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <div className="border rounded p-2 text-center hover:bg-orange-50 cursor-pointer">PNG</div>
                                    <div className="border rounded p-2 text-center hover:bg-orange-50 cursor-pointer">JPG(JPEG)</div>
                                    <div className="border rounded p-2 text-center hover:bg-orange-50 cursor-pointer">WEBP</div>
                                    <div className="border rounded p-2 text-center hover:bg-orange-50 cursor-pointer">ZIP</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handlePrevStep}
                            disabled={currentStep === 1}
                        >
                            이전
                        </Button>
                        <Button
                            onClick={handleNextStep}
                            disabled={currentStep === 3}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            다음 <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">실제 사용해보기</h2>
                <Card>
                    <CardContent className="p-6 flex max-w-xl justify-center">

                            <InteractivePannel />

                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>자주 묻는 질문</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li><a href="/docs/faq" className="text-orange-400 hover:text-yellow-300 hover:underline">지원하는 파일 형식은 무엇인가요?</a></li>
                            <li><a href="/docs/faq" className="text-orange-400 hover:text-yellow-300 hover:underline">최대 파일 크기는 얼마인가요?</a></li>
                            <li><a href="/docs/faq" className="text-orange-400 hover:text-yellow-300 hover:underline">처리된 이미지는 얼마나 보관되나요?</a></li>
                            <li><a href="/docs/faq" className="text-orange-400 hover:text-yellow-300 hover:underline">배치 처리가 가능한가요?</a></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>유용한 팁</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li>upscale의 sharp 기능을 이용하면 결과를 빨리 받아볼 수 있습니다.</li>
                            <li>Prev Version 에서 제한적 배치 프로세스 기능을 체험할 수 있습니다.</li>
                            <li>결과 이미지는 원하시는 파일 형식으로 받아볼 수 있습니다.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>도움이 필요하신가요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">추가 지원이 필요하시면 아래 링크를 확인하세요:</p>
                        <ul className="space-y-2">
                            <li><a href="/docs" className="text-blue-500 hover:underline">상세 사용 가이드</a></li>

                            <li><a href="/docs/contactus-architecture" className="text-blue-500 hover:underline">피드백 보내기, 문의하기</a></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
