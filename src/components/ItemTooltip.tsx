'use client';

import { useRef, useState } from 'react';

export default function ItemTooltip({
  name, cost, text, children,
}: {
  name: string;
  cost?: number;
  text?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={ref}
    >
      {children}
      {open && (
        <div className="absolute z-50 -left-2 top-12 min-w-[220px] max-w-[280px] rounded-xl border border-white/10 bg-[#0b0d16]/95 p-3 text-sm shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="font-medium">{name}</div>
            {typeof cost === 'number' && (
              <div className="text-white/80 text-xs">🪙 {cost}</div>
            )}
          </div>
          {text && <div className="mt-1 text-white/75 leading-snug">{text}</div>}
        </div>
      )}
    </div>
  );
}
