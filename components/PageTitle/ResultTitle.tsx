'use client'

import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

interface ResultTitleProps {
    children: React.ReactNode;
}

export default function ResultTitle({ children }: ResultTitleProps) {
    return (
        <div className="flex items-start gap-4 scale-90 md:scale-95">
            {/* 좌측 sitDown.svg 이미지 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Image
                    src="/sitDown.svg"
                    alt="Sit Down"
                    width={130}
                    height={130}
                    className="object-contain"
                />
            </motion.div>

            {/* 텍스트 컨텐츠 */}
            <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* 메인 제목 */}
                <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg max-w-2xl leading-tight">
                    <motion.span
                        className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 block mt-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                    >
                        {children}
                    </motion.span>

                    <motion.span
                        className="block relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    >
                        Warehouse
                    </motion.span>
                </h1>
            </motion.div>
        </div>
    );
}
