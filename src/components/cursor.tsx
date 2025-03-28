import React, { useEffect, useRef, useState } from "react";

interface CirclePosition {
  x: number;
  y: number;
}

interface SplashEffect {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

// Colors gradient that transitions smoothly (from orange to purple)
const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

// Function to generate random vibrant colors for splash effects
const getRandomColor = () => {
  const vibrantColors = [
    "#f87171",
    "#fb923c",
    "#facc15",
    "#4ade80",
    "#2dd4bf",
    "#22d3ee",
    "#60a5fa",
    "#a78bfa",
    "#c084fc",
    "#f472b6",
    "#10b981",
    "#3b82f6",
  ];
  return vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
};

const Cursor: React.FC = () => {
  const circlesCount = 22; // Match the number of colors in the array
  const circleElements = useRef<(HTMLDivElement | null)[]>([]);
  const circlePositions = useRef<CirclePosition[]>(
    Array(circlesCount).fill({ x: 0, y: 0 })
  );
  const coords = useRef({ x: 0, y: 0 });
  const [splashEffects, setSplashEffects] = useState<SplashEffect[]>([]);
  const splashIdCounter = useRef(0);

  // Hide native cursor
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      body, a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
      
      @keyframes splash {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Initialize circle positions
    circleElements.current.forEach((circle, index) => {
      if (circle) {
        circlePositions.current[index] = { x: 0, y: 0 };
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      const randomColor = getRandomColor();
      const newSplash: SplashEffect = {
        id: splashIdCounter.current++,
        x: e.clientX,
        y: e.clientY,
        size: 30,
        opacity: 0.8,
        color: randomColor,
      };

      setSplashEffects((prev) => [...prev, newSplash]);

      setTimeout(() => {
        setSplashEffects((prev) =>
          prev.filter((splash) => splash.id !== newSplash.id)
        );
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animateCircles = () => {
      // Start with current mouse position
      let x = coords.current.x;
      let y = coords.current.y;

      // Update each circle's position
      circleElements.current.forEach((circle, index) => {
        if (circle) {
          // Position the circle
          circle.style.left = `${x - 12}px`;
          circle.style.top = `${y - 12}px`;

          // Scale effect - exactly like your vanilla JS example
          circle.style.transform = `scale(${
            (circlesCount - index) / circlesCount
          })`;

          // Store current position for this circle
          circlePositions.current[index] = { x, y };

          // Calculate next circle's position with easing
          const nextCircle =
            circlePositions.current[index + 1] || circlePositions.current[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        }
      });

      requestAnimationFrame(animateCircles);
    };

    const animationId = requestAnimationFrame(animateCircles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Cursor circles */}
      {Array.from({ length: circlesCount }).map((_, index) => (
        <div
          key={`circle-${index}`}
          ref={(el) => (circleElements.current[index] = el)}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-[99999999]"
          style={{
            top: 0,
            left: 0,
            backgroundColor: colors[index],
            opacity: 0.8,
            transform: "scale(1)",
            boxShadow:
              index < 5 ? `0 0 ${10 - index * 2}px ${colors[index]}` : "none",
          }}
        />
      ))}

      {/* Splash effects */}
      {splashEffects.map((splash) => {
        const hexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const baseColor = hexToRgba(splash.color, 0.7);
        const fadeColor = hexToRgba(splash.color, 0.5);

        return (
          <div
            key={`splash-${splash.id}`}
            className="fixed pointer-events-none z-[99999998]"
            style={{
              width: `${splash.size}px`,
              height: `${splash.size}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${baseColor} 0%, ${fadeColor} 70%, transparent 100%)`,
              boxShadow: `0 0 20px ${hexToRgba(splash.color, 0.4)}`,
              pointerEvents: "none",
              animation:
                "splash 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
              position: "fixed",
              left: `${splash.x}px`,
              top: `${splash.y}px`,
            }}
          />
        );
      })}
    </>
  );
};

export default Cursor;
