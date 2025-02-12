import React from 'react';
import { Upload, Sliders, Coffee, Download } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Start by uploading your image that needs enhancement',
    },
    {
      icon: Sliders,
      title: 'Choose Enhancement',
      description: 'Select from uncrop, upscale, or square conversion options',
    },
    {
      icon: Coffee,
      title: 'Take a Break',
      description: 'Our AI works its magic while you enjoy your coffee',
    },
    {
      icon: Download,
      title: 'Get Results',
      description: 'Preview and download your enhanced images',
    },
  ];

  return (
    <section className="w-full p-8 relative sm:mt-20 max-w-6xl">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />

      <div className="mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          How It Works
        </h2>

        {/* 모바일/태블릿: 그리드, 데스크탑: flex로 변경 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:items-start lg:gap-16 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group lg:flex-1 ${
                // 데스크탑에서만 계단식 적용
                index === 1
                  ? 'lg:mt-16'
                  : index === 2
                  ? 'lg:mt-32'
                  : index === 3
                  ? 'lg:mt-48'
                  : ''
              }`}
            >
              {/* 화살표 */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/3 transform translate-x-full">
                  <svg
                    width="32"
                    height="32"
                    className="text-orange-400/70"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M5 16H27M27 16L20 9M27 16L20 23"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* 카드 */}
              <div className="relative h-full border border-orange-500/20 rounded-lg">
                {/* 카드 배경 */}
                <div className="absolute inset-0 bg-black/40 rounded-lg" />

                {/* 카드 내용 */}
                <div className="relative p-6">
                  {/* 아이콘 */}
                  <div className="w-12 h-12 rounded-full bg-[#3A2618] flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-orange-400" />
                  </div>

                  {/* 텍스트 */}
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
