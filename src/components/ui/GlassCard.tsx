import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl`}>
      <div className={`bg-studio-bg/80 backdrop-blur-2xl rounded-2xl border border-white/5 ${className}`}>
        {children}
      </div>
    </div>
  );
}
