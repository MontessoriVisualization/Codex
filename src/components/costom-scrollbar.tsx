import React, { useEffect, ReactNode, useState } from "react";
import "./costom-scrollbar.css";

interface CustomScrollbarProps {
  children: ReactNode;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  // Initialize cursor position state to track mouse movements
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Optional: display the cursor position for debugging
  console.log(cursorPosition); // This ensures the value is read
  useEffect(() => {
    // Apply the custom scrollbar styles to the document
    document.documentElement.classList.add("custom-scrollbar");

    // Track mouse position for hover effect proximity
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const scrollbarRight = window.innerWidth - 5;
      const proximity = Math.abs(e.clientX - scrollbarRight);

      // Create a glow effect when mouse is near scrollbar
      if (proximity < 100) {
        const intensity = Math.max(0, 100 - proximity);
        document.documentElement.style.setProperty(
          "--glow-intensity",
          `${intensity}%`
        );
        document.documentElement.style.setProperty(
          "--scrollbar-width",
          `${10 + intensity * 0.1}px`
        );
      } else {
        document.documentElement.style.setProperty("--glow-intensity", "0%");
        document.documentElement.style.setProperty("--scrollbar-width", "10px");
      }
    };

    // Add a visual effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPosition / maxScroll) * 100;

      // Update progress for the animated indicator
      document.documentElement.style.setProperty(
        "--scroll-percent",
        `${scrollPercent}%`
      );

      // Adjust the hue of the scrollbar gradient based on scroll position
      if (scrollPercent > 0) {
        const hueRotate = Math.min(scrollPercent, 100);

        // Color transitions based on scroll position
        document.documentElement.style.setProperty(
          "--scrollbar-thumb-from",
          `hsl(${142 + hueRotate * 0.8}, ${70 + scrollPercent * 0.2}%, ${
            50 + scrollPercent * 0.1
          }%)`
        );
        document.documentElement.style.setProperty(
          "--scrollbar-thumb-to",
          `hsl(${217 + hueRotate * 0.5}, ${70 + scrollPercent * 0.2}%, ${
            55 + scrollPercent * 0.1
          }%)`
        );

        // Dynamic animation speed based on scroll position
        const animationSpeed = Math.max(0.5, 3 - scrollPercent * 0.02);
        document.documentElement.style.setProperty(
          "--animation-speed",
          `${animationSpeed}s`
        );

        // Update particles position
        document.documentElement.style.setProperty(
          "--particle-offset",
          `${scrollPercent}px`
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Initial call to set up everything
    handleScroll();

    return () => {
      // Clean up on unmount
      document.documentElement.classList.remove("custom-scrollbar");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <>{children}</>; // Return children so the component works as a wrapper
};

export default CustomScrollbar;
