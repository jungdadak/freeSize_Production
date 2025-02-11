'use client';

import { useEffect, useState } from 'react';

export default function HeroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(0, 1 - window.scrollY / 200);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center md:items-start transition-opacity duration-300"
      style={{ opacity }}
    >
      {children}
    </div>
  );
}
