import type { ReactNode } from 'react';

export function BrandMark() {
  return (
    <div className="flex items-center gap-[0.7vw] text-text">
      <span className="flex h-[2.4vw] w-[2.4vw] items-center justify-center rounded-[0.35vw] bg-accent text-[1.5vw] font-bold text-bg">
        M
      </span>
      <span className="font-display text-[1.5vw] font-semibold tracking-[0.08em]">
        MANUFACTUREOS
      </span>
    </div>
  );
}

export function Chrome({
  number,
  section = 'MANUFACTURING OPERATING SYSTEM',
}: {
  number: string;
  section?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-[6vw] bottom-[4.2vh] flex items-center justify-between border-t border-white/10 pt-[1.6vh]">
      <span className="font-mono text-[1.5vw] tracking-[0.18em] text-muted">
        {section}
      </span>
      <span className="font-mono text-[1.5vw] tracking-[0.18em] text-accent">
        {number} / 16
      </span>
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[1.5vw] font-medium uppercase tracking-[0.22em] text-accent">
      {children}
    </div>
  );
}

export function Rule() {
  return <div className="accent-rule h-[0.35vh] w-[8vw]" />;
}

export function Bullet({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-[1vw]">
      <span
        className={
          accent
            ? 'mt-[0.6vh] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-accent'
            : 'mt-[0.6vh] h-[0.7vw] w-[0.7vw] shrink-0 rounded-full bg-primary'
        }
      />
      <p className="text-[2vw] leading-[1.13] text-text">{children}</p>
    </div>
  );
}

export function Card({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? 'panel-sheen border border-accent/30 p-[1.7vw]'
          : 'panel-sheen border border-white/10 p-[1.7vw]'
      }
    >
      {children}
    </div>
  );
}