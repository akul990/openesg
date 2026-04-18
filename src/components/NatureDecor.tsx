export function Leaf({
  size = 64,
  rotate = 0,
}: {
  size?: number;
  rotate?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 72"
      fill="currentColor"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M24 2C24 2 4 16 4 36C4 52 12 66 24 70C36 66 44 52 44 36C44 16 24 2 24 2Z" />
      <path
        d="M24 6 L24 66"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.25"
      />
      <path
        d="M24 24 C24 24 16 30 14 36"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.15"
      />
      <path
        d="M24 38 C24 38 32 44 34 50"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.15"
      />
    </svg>
  );
}
