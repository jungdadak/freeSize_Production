import { Home, RocketIcon, BookOpen, Activity } from 'lucide-react';
import Link from 'next/link';
import DarkModeToggler from './DarkModeToggler';
import Logo from './Logo';

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
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 h-16 z-50
        bg-[#2A2D2E]
        border-b border-slate-800
        transition-colors duration-200
        ${className}
      `}
    >
      <div className="mx-5 pr-4 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  flex items-center gap-2 px-3 py-2 rounded-md
                  text-slate-200
                  hover:bg-orange-700
                  transition-colors duration-100
                "
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* 다크모드 토글러 */}
          <DarkModeToggler />
        </div>
      </div>
    </header>
  );
}
