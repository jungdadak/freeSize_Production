import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Nav/NavBar';
import {cookies} from 'next/headers';
import ReduxProvider from '@/lib/redux/ReduxProvider';
import TanstackProviders from '@/utils/TanstackProviders';

import {Toaster} from "sonner";

import Image from "next/image";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {

  title: 'Freesize - LORA 모델 학습을 위한 이미지 전처리 서비스',
  description: '이미지 전처리 서비스: Upscale, Uncrop, Square 기능을 제공합니다.',
  keywords: ['이미지 전처리', 'LORA', 'AI', 'upscale', 'uncrop', 'square'],
  authors: [{ name: 'Freesize Team' }],
  openGraph: {
    title: 'Freesize - LORA 모델 학습을 위한 이미지 전처리 서비스',
    description: '이미지 전처리 서비스: Upscale, Uncrop, Square 기능을 제공합니다.',
    url: 'https://freesize.ai',
    siteName: 'Freesize',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Freesize - 이미지 전처리 서비스',
      },
    ],
    type: 'website',
  },

};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const modeCookie = (await cookies()).get('mode');
    const isDarkMode = !modeCookie || modeCookie.value !== 'light';
    console.log('모드 : ', modeCookie?.value); //모드 체크용 nextconfig 에서 삭제처리 예정

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${
                isDarkMode ? 'dark' : ''
            } antialiased`}
        >
        <Navbar/>
        <ReduxProvider>

          <TanstackProviders>
            <main className="min-h-screen pt-16">            {/* 배경 이미지 – 기존 디자인 그대로 */}
              <Image
                  src="/bgcat.webp"
                  alt="Background Cat"
                  priority
                  className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
                  width={2560}
                  height={1440}
                  sizes="100vw"
              />
              {children}</main>                <Toaster theme={isDarkMode ? 'dark' : 'light'}/>

          </TanstackProviders>
        </ReduxProvider>

      <Footer/>
      </body>
    </html>
  );

}
