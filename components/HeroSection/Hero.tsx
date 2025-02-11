'use client';
import { useState, useRef, useEffect } from 'react';

type HeroProps = {
  children: React.ReactNode;
  alignment?: 'start' | 'center';
};

export default function Hero({ children, alignment = 'start' }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const lastScrollY = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        scrollDirectionRef.current = 'down';
      } else {
        scrollDirectionRef.current = 'up';
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const newOpacity =
          scrollDirectionRef.current === 'down' ? Math.pow(ratio, 5) : ratio;
        setOpacity(newOpacity);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen w-full flex flex-col items-${alignment} justify-start transition-opacity pt-16 duration-300`}
      style={{ opacity }}
    >
      {children}
    </div>
  );
}
