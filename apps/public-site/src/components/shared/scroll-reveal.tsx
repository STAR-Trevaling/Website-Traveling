"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds (default: 1150ms for slow, graceful reveal)
  distance?: number; // Distance in pixels
  threshold?: number; // Intersection threshold
  as?: React.ElementType;
}

/**
 * Ultra-high-performance ScrollReveal component
 * Eliminates React re-render lag by toggling pure GPU CSS classes via IntersectionObserver directly on the DOM element.
 * Zero VDOM reconciliation during scroll, 100% 60fps/120fps hardware acceleration.
 */
export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1150, // 1.15s slow, elegant reveal matching user preference
  distance = 32,
  threshold = 0.08,
  as: Component = "div",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Show immediately if IntersectionObserver is unavailable or user prefers reduced motion
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("reveal-active");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add class directly to DOM without triggering React component re-renders
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const directionClass =
    direction === "down"
      ? "reveal-down"
      : direction === "scale"
      ? "reveal-scale"
      : direction === "fade"
      ? "reveal-fade"
      : "";

  const customStyle: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    ...(distance ? { "--reveal-distance": `${distance}px` } as React.CSSProperties : {}),
  };

  return (
    <Component
      ref={elementRef}
      style={customStyle}
      className={`reveal-init ${directionClass} transform-gpu ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * StaggerRevealGroup: Renders a container whose children glide in one after another over 1.15s
 */
interface StaggerRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  direction?: "up" | "down" | "fade" | "scale";
  duration?: number;
  distance?: number;
  threshold?: number;
  as?: React.ElementType;
}

export function StaggerRevealGroup({
  children,
  className = "",
  staggerDelay = 140,
  baseDelay = 0,
  direction = "up",
  duration = 1150,
  distance = 32,
  threshold = 0.08,
  as: Component = "div",
}: StaggerRevealGroupProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      container.classList.add("reveal-active");
      const childrenElements = container.querySelectorAll(".reveal-child");
      childrenElements.forEach((el) => el.classList.add("reveal-active"));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          const childrenElements = entry.target.querySelectorAll(".reveal-child");
          childrenElements.forEach((el) => el.classList.add("reveal-active"));
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const directionClass =
    direction === "down"
      ? "reveal-down"
      : direction === "scale"
      ? "reveal-scale"
      : direction === "fade"
      ? "reveal-fade"
      : "";

  return (
    <Component ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const childDelay = baseDelay + index * staggerDelay;

        const childStyle: React.CSSProperties = {
          transitionDuration: `${duration}ms`,
          transitionDelay: `${childDelay}ms`,
          ...(distance ? { "--reveal-distance": `${distance}px` } as React.CSSProperties : {}),
        };

        return (
          <div
            style={childStyle}
            className={`reveal-init reveal-child ${directionClass} transform-gpu h-full w-full`}
          >
            {child}
          </div>
        );
      })}
    </Component>
  );
}
