"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { color: "rgba(45,212,160,0.04)",  speed: 0.004,  amp: 52, freq: 0.0072, y: 0.28, phase: 0.0 },
  { color: "rgba(45,212,160,0.035)", speed: 0.003,  amp: 68, freq: 0.0055, y: 0.42, phase: 1.8 },
  { color: "rgba(26,122,74,0.06)",   speed: 0.0024, amp: 80, freq: 0.0045, y: 0.57, phase: 3.4 },
  { color: "rgba(14,64,38,0.09)",    speed: 0.0016, amp: 70, freq: 0.0058, y: 0.70, phase: 5.2 },
  { color: "rgba(8,22,14,0.15)",     speed: 0.001,  amp: 55, freq: 0.0040, y: 0.83, phase: 2.1 },
];

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    }

    function drawWave(w: typeof WAVES[0]) {
      if (!canvas || !ctx) return;
      const { width, height } = canvas;
      const baseY = height * w.y;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width + 1; x++) {
        const y =
          baseY +
          Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp +
          Math.sin(x * w.freq * 1.6 + t * w.speed * 0.65 + w.phase + 1) * (w.amp * 0.38);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = w.color;
      ctx.fill();
    }

    function frame() {
      if (!canvas || !ctx) return;
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const w of WAVES) drawWave(w);
      animId = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? document.body);
    frame();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
