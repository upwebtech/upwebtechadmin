'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const dimensions = {
    sm: { img: 36, text: 'text-base', sub: 'text-[9px]' },
    md: { img: 44, text: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 56, text: 'text-2xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-700/60 shadow-lg shadow-cyan-500/10 flex items-center justify-center">
        <Image
          src="/logo.jpg"
          alt="UP Web Tech Logo"
          width={dimensions.img}
          height={dimensions.img}
          className="object-cover rounded-xl"
          priority
        />
      </div>
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-wider text-white ${dimensions.text} flex items-center gap-1.5`}>
          <span>UP WEB TECH</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        </div>
        {showSubtitle && (
          <span className={`font-semibold tracking-widest text-amber-400 uppercase mt-0.5 ${dimensions.sub}`}>
            SINCE 2026
          </span>
        )}
      </div>
    </div>
  );
};
