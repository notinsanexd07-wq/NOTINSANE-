import React, { useEffect, useRef } from 'react';
import { ThemeConfig } from '../types';
import { motion } from 'motion/react';

interface AmbientBackgroundProps {
  theme: ThemeConfig;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Default values if undefined
  const particlesEnabled = theme.particlesEnabled ?? true;
  const movingLinesEnabled = theme.movingLinesEnabled ?? true;
  const gridEnabled = theme.gridEnabled ?? false;
  const glowingOrbsEnabled = theme.glowingOrbsEnabled ?? true;
  const starsEnabled = theme.starsEnabled ?? false;
  const shootingStarsEnabled = theme.shootingStarsEnabled ?? true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Helper to convert hex to rgb string for gradients
    const hexToRgb = (hex: string): string => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
      return result 
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '168, 85, 247'; // fallback
    };

    // Setup objects
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }

    interface MovingLine {
      y: number;
      speed: number;
      alpha: number;
      thickness: number;
    }

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      alphaSpeed: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      speed: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const movingLines: MovingLine[] = [];
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    // Initialize Particles
    if (particlesEnabled) {
      const particleCount = Math.min(45, Math.floor((width * height) / 30000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? theme.primaryColor : theme.secondaryColor,
        });
      }
    }

    // Initialize Moving Lines
    if (movingLinesEnabled) {
      const lineCount = 3;
      for (let i = 0; i < lineCount; i++) {
        movingLines.push({
          y: Math.random() * height,
          speed: Math.random() * 0.4 + 0.2,
          alpha: Math.random() * 0.15 + 0.05,
          thickness: Math.random() * 1.5 + 0.5,
        });
      }
    }

    // Initialize Stars
    if (starsEnabled) {
      const starCount = Math.min(100, Math.floor((width * height) / 15000));
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1 + 0.5,
          alpha: Math.random(),
          alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Stars
      if (starsEnabled) {
        stars.forEach((star) => {
          star.alpha += star.alphaSpeed;
          if (star.alpha <= 0 || star.alpha >= 1) {
            star.alphaSpeed = -star.alphaSpeed;
          }
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.alpha))})`;
          ctx.fill();
        });
      }

      // Draw Particles & Connections
      if (particlesEnabled) {
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary checks
          if (p.x < 0 || p.x > width) p.vx = -p.vx;
          if (p.y < 0 || p.y > height) p.vy = -p.vy;

          // Draw point
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Connect nearby particles
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = theme.primaryColor;
              ctx.globalAlpha = (1 - dist / 100) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });
      }

      // Draw Moving Scanning Lines
      if (movingLinesEnabled) {
        movingLines.forEach((line) => {
          line.y += line.speed;
          if (line.y > height) {
            line.y = -10;
            line.speed = Math.random() * 0.4 + 0.2;
          }

          ctx.beginPath();
          ctx.moveTo(0, line.y);
          ctx.lineTo(width, line.y);
          ctx.strokeStyle = theme.primaryColor;
          ctx.globalAlpha = line.alpha;
          ctx.lineWidth = line.thickness;
          ctx.stroke();
          ctx.globalAlpha = 1;
        });
      }

      // Draw Shooting Stars
      if (shootingStarsEnabled) {
        // Spawn a shooting star randomly if count is less than 3
        if (shootingStars.length < 3 && Math.random() < 0.012) {
          const angle = Math.PI * 0.18 + (Math.random() - 0.5) * 0.08; // smooth down-right diagonal
          const speed = Math.random() * 2.5 + 2.5; // slower, extremely elegant speed (2.5 to 5.0)
          shootingStars.push({
            x: Math.random() * width * 0.5 - 200, // starts offscreen left or left-half
            y: Math.random() * height * 0.3 - 100, // starts top region
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: Math.random() * 160 + 120, // longer elegant tails
            speed: speed,
            alpha: 1.0,
          });
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.008; // slower, smoother fade out for longer trail persistence

          if (s.alpha <= 0 || s.x > width + 200 || s.y > height + 200) {
            shootingStars.splice(i, 1);
            continue;
          }

          // Create a gradient for the trailing light tail
          const tailX = s.x - s.vx * (s.length / s.speed);
          const tailY = s.y - s.vy * (s.length / s.speed);
          const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
          grad.addColorStop(0.12, `rgba(${hexToRgb(theme.primaryColor)}, ${s.alpha * 0.75})`);
          grad.addColorStop(0.4, `rgba(${hexToRgb(theme.secondaryColor)}, ${s.alpha * 0.35})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Smooth glowing core
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particlesEnabled, movingLinesEnabled, starsEnabled, shootingStarsEnabled, theme.primaryColor, theme.secondaryColor]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background base gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${theme.bgGradientStart}, ${theme.bgGradientEnd})`
        }}
      />

      {/* Grid Pattern */}
      {gridEnabled && (
        <div 
          className="absolute inset-0 opacity-[0.06] transition-all duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${theme.primaryColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme.primaryColor} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      )}

      {/* Canvas for Particles, moving lines, stars & shooting stars */}
      {(particlesEnabled || movingLinesEnabled || starsEnabled || shootingStarsEnabled) && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}

      {/* Glowing Floating Orbs */}
      {glowingOrbsEnabled && (
        <div className="absolute inset-0 overflow-hidden filter blur-[120px] opacity-25">
          {/* Orb 1: Primary color */}
          <motion.div
            animate={{
              x: [0, 120, -100, 0],
              y: [0, -80, 100, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.primaryColor} 0%, transparent 70%)`
            }}
          />

          {/* Orb 2: Secondary color */}
          <motion.div
            animate={{
              x: [0, -100, 120, 0],
              y: [0, 120, -60, 0],
              scale: [1, 0.8, 1.1, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 -right-20 w-[40vw] h-[40vw] rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.secondaryColor} 0%, transparent 70%)`
            }}
          />

          {/* Orb 3: Glow accent color */}
          <motion.div
            animate={{
              x: [0, 80, -80, 0],
              y: [0, 100, -120, 0],
              scale: [1, 1.1, 0.85, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`
            }}
          />
        </div>
      )}
    </div>
  );
};
