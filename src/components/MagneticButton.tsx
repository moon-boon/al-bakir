import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  strength?: number;
} & ComponentPropsWithoutRef<T>;

export default function MagneticButton<T extends ElementType = "a">({
  as,
  strength = 14,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: Props<T>) {
  const Tag = (as || "a") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const enabled = !reduced && !touch;

  return (
    <Tag
      ref={ref}
      {...rest}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        onMouseMove?.(e);
        if (!enabled || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        ref.current.style.transform = `translate3d(${(x / r.width) * strength}px, ${(y / r.height) * strength}px, 0)`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        onMouseLeave?.(e);
        if (!ref.current) return;
        ref.current.style.transform = "";
      }}
      style={{ transition: "transform 0.35s cubic-bezier(.2,.8,.2,1)", ...(rest as { style?: React.CSSProperties }).style }}
    >
      {children}
    </Tag>
  );
}
