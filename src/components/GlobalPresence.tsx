"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import worldmapSrc from "@/src/assets/worldmap.svg";

const stats = [
  { value: "500+", label: "Clients" },
  { value: "40+", label: "Countries" },
  { value: "10+", label: "Industries" },
  { value: "6+", label: "Frameworks" },
];

/*
 * Marker positions in the worldmap's native 5760 × 3240 viewport.
 * x = (lon + 180) × 16    y = (90 − lat) × 18
 */
const MARKERS = [
  { cx: 1328, cy: 936,  label: "United States",  region: "North America"  },
  { cx: 3024, cy: 720,  label: "Europe",          region: "Central Europe" },
  { cx: 4048, cy: 1278, label: "India",            region: "South Asia"     },
  { cx: 5296, cy: 2232, label: "Australia",        region: "Asia Pacific"   },
];

const ORANGE = "#f97316";
const TOOLTIP_W = 560;
const TOOLTIP_H = 200;
// Distance from dot centre to top of tooltip when shown above
const ABOVE_OFFSET = 500;
// If tooltip top would be less than this y, flip it below the dot instead
const FLIP_THRESHOLD = 300;

export function GlobalPresence() {
  const [hovered, setHovered] = useState<number | null>(null);

  const mapHref: string =
    typeof worldmapSrc === "string"
      ? worldmapSrc
      : (worldmapSrc as { src: string }).src;

  return (
    <section className="relative overflow-hidden bg-dark py-16 sm:py-24">
      {/* Soft radial glow for depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-emerald-100/80 backdrop-blur">
            <Globe className="h-3.5 w-3.5" aria-hidden />
            Global Presence
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Trusted Across the Globe
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-emerald-100/70 sm:text-lg">
          Empowering organisations worldwide with comprehensive ESG solutions
          and sustainability expertise across every major region.
        </p>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10 sm:gap-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-100/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* World map — no overflow-hidden so tooltip can bleed upward if needed */}
        <div className="mt-10">
          <svg
            viewBox="0 0 5760 3240"
            className="w-full"
            overflow="visible"
            aria-label="World map showing global presence"
            role="img"
          >
            {/* worldmap.svg – black dots inverted to white at low opacity */}
            <image
              href={mapHref}
              x="0"
              y="0"
              width="5760"
              height="3240"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.2 }}
            />

            {MARKERS.map(({ cx, cy, label, region }, i) => {
              const isHovered = hovered === i;

              // Flip tooltip below the dot if showing above would leave canvas
              const showBelow = cy - ABOVE_OFFSET < FLIP_THRESHOLD;
              const tooltipY = showBelow ? cy + 180 : cy - ABOVE_OFFSET;

              // Clamp horizontally so it never overflows left/right edge
              const tooltipX = Math.min(
                Math.max(cx - TOOLTIP_W / 2, 40),
                5760 - TOOLTIP_W - 40
              );

              // Caret sits between dot and box
              const caretHalf = 32;
              const caretPoints = showBelow
                ? `${cx - caretHalf},${cy + 180} ${cx + caretHalf},${cy + 180} ${cx},${cy + 110}`
                : `${cx - caretHalf},${cy - ABOVE_OFFSET + TOOLTIP_H} ${cx + caretHalf},${cy - ABOVE_OFFSET + TOOLTIP_H} ${cx},${cy - ABOVE_OFFSET + TOOLTIP_H + 70}`;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Invisible large hit area for easy hovering */}
                  <circle cx={cx} cy={cy} r="160" fill="transparent" />

                  {/* Outer pulse ring */}
                  <circle cx={cx} cy={cy} r="55" fill={ORANGE} opacity="0.35">
                    <animate
                      attributeName="r"
                      values="55;135"
                      dur="2.4s"
                      begin={`${i * 0.55}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.35;0"
                      dur="2.4s"
                      begin={`${i * 0.55}s`}
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Solid marker dot */}
                  <circle cx={cx} cy={cy} r="36" fill={ORANGE} />
                  {/* Inner white highlight */}
                  <circle cx={cx} cy={cy} r="15" fill="white" opacity="0.85" />

                  {/* Tooltip — shown on hover */}
                  {isHovered && (
                    <g>
                      {/* Caret connecting box to dot */}
                      <polygon points={caretPoints} fill="#0f2d1e" />
                      {/* Box */}
                      <rect
                        x={tooltipX}
                        y={tooltipY}
                        width={TOOLTIP_W}
                        height={TOOLTIP_H}
                        rx="36"
                        fill="#0f2d1e"
                        stroke="rgba(45,212,160,0.3)"
                        strokeWidth="5"
                      />
                      {/* Country label */}
                      <text
                        x={tooltipX + TOOLTIP_W / 2}
                        y={tooltipY + 108}
                        textAnchor="middle"
                        fill="white"
                        fontSize="76"
                        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                        fontWeight="700"
                      >
                        {label}
                      </text>
                      {/* Sub-label */}
                      <text
                        x={tooltipX + TOOLTIP_W / 2}
                        y={tooltipY + 168}
                        textAnchor="middle"
                        fill="#2dd4a0"
                        fontSize="54"
                        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                        fontWeight="500"
                        opacity="0.85"
                      >
                        {region}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
