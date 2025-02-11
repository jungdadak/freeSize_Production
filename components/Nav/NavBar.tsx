'use client';

import { Home, RocketIcon, BookOpen, Activity, Menu, X } from 'lucide-react';
import Link from 'next/link';
import DarkModeToggler from './DarkModeToggler';
import Logo from './Logo';
import { useState } from 'react';

const navItems = [
  {
    href: '/quickstart',
    label: 'Quick Start',
    icon: <RocketIcon className="w-5 h-5" />,
  },
  {
    href: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: '/docs',
    label: 'Docs',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: '/status',
    label: 'Status',
    icon: <Activity className="w-5 h-5" />,
  },
];

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className = '' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 h-16 z-50
        bg-transparent
        transition-colors duration-200
        ${className}
      `}
    >
      <div className="mx-5 pr-4 h-full flex items-center justify-between">
        {/* 로고 섹션 */}
        <section className="flex items-center">
          <Logo />
        </section>

        {/* 네브바 가운데 요소 섹션 */}
        <section className="flex items-center mx-auto">
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  flex items-center gap-3 px-3 py-2 rounded-2xl
                  text-slate-200
                  hover:bg-orange-600/70
                  transition-colors duration-100
                "
              >
                {item.icon}
                <span className="font-bold text-md">{item.label}</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* 다크모드 토글러 (데스크톱) */}
        <div className="hidden lg:block">
          <DarkModeToggler />
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <button
          className="lg:hidden rounded-full p-2 text-slate-200 hover:bg-slate-700/50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu
            className={`w-6 h-6 absolute transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
            }`}
          />
          <X
            className={`w-6 h-6 transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
            }`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      <div
        className={`
        lg:hidden absolute top-16 right-0 w-64 bg-black/80 backdrop-blur-sm rounded-lg
        transform transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-slate-200
                hover:bg-orange-300/50
                transition-colors duration-100
              "
            >
              {item.icon}
              <span className="font-bold text-md">{item.label}</span>
            </Link>
          ))}
          {/* 다크모드 토글러 (모바일) */}
          <div className="mt-4 px-4 py-3 border-t border-orange-300">
            <DarkModeToggler />
          </div>
        </nav>
      </div>

      {/* 배경 오버레이 */}
      <div
        className={`
          fixed inset-0 bg-black/50 lg:hidden
          transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
}
