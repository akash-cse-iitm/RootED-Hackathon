/**
 * Lightweight canvas confetti — no external package needed.
 */
export function fireConfetti(count = 130) {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ["#3eb489", "#f0a500", "#e45c3a", "#4a90d9", "#9b59b6", "#f1c40f"];

  type Particle = {
    x: number; y: number; vx: number; vy: number;
    color: string; w: number; h: number;
    rotation: number; spin: number;
  };

  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 60,
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 4 + 2,
    color: palette[Math.floor(Math.random() * palette.length)],
    w: Math.random() * 10 + 5,
    h: Math.random() * 6 + 3,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.18,
  }));

  const total = 180;
  let frame = 0;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const alpha = Math.max(0, 1 - frame / total);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (frame < total) requestAnimationFrame(draw);
    else canvas.remove();
  }

  requestAnimationFrame(draw);
}
