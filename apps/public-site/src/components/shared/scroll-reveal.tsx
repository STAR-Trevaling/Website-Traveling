"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds (default: 650ms for smooth, responsive reveal)
  distance?: number; // Distance in pixels
  threshold?: number; // Intersection threshold
  as?: React.ElementType;
}

/**
 * Ultra-high-performance ScrollReveal component
 * Eliminates React re-render lag by toggling pure GPU CSS classes via IntersectionObserver directly on the DOM element.
 * Zero VDOM reconciliation during scroll, 100% 60fps/120fps hardware acceleration.
 * Includes proactive 200px rootMargin, instant mount-check, and safety fallback to prevent content hiding.
 */
export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 650,
  distance = 24,
  threshold = 0.01,
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

    // Proactive check: if element is already within or near the viewport on mount, show immediately
    const rect = element.getBoundingClientRect();
    if (rect.top <= (window.innerHeight || 800) + 200 && rect.bottom >= -150) {
      element.classList.add("reveal-active");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 200px 0px", // Proactive trigger 200px before reaching viewport
      }
    );

    observer.observe(element);

    // Fail-safe safety timer: under no circumstances should content remain hidden
    const timer = setTimeout(() => {
      element.classList.add("reveal-active");
    }, 700);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
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
    ...(distance ? ({ "--reveal-distance": `${distance}px` } as React.CSSProperties) : {}),
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
 * StaggerRevealGroup: Renders a container whose children glide in one after another smoothly
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
  staggerDelay = 120,
  baseDelay = 0,
  direction = "up",
  duration = 650,
  distance = 24,
  threshold = 0.01,
  as: Component = "div",
}: StaggerRevealGroupProps) {
  const containerRef = useRef<HTMLElement>(null);

  const activateElements = () => {
    const container = containerRef.current;
    if (!container) return;
    container.classList.add("reveal-active");
    const childrenElements = container.querySelectorAll(".reveal-child");
    childrenElements.forEach((el) => el.classList.add("reveal-active"));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      activateElements();
      return;
    }

    // Proactive check: if already in or near viewport
    const rect = container.getBoundingClientRect();
    if (rect.top <= (window.innerHeight || 800) + 200 && rect.bottom >= -150) {
      activateElements();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activateElements();
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 200px 0px", // Proactive trigger
      }
    );

    observer.observe(container);

    // Fail-safe safety timer: reveal within 700ms so content is NEVER stuck invisible
    const timer = setTimeout(() => {
      activateElements();
    }, 700);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold]);

  // When children update (e.g. language switch or re-render), ensure they are active if container is active
  useEffect(() => {
    if (containerRef.current?.classList.contains("reveal-active")) {
      const childrenElements = containerRef.current.querySelectorAll(".reveal-child");
      childrenElements.forEach((el) => el.classList.add("reveal-active"));
    }
  }, [children]);

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
          ...(distance ? ({ "--reveal-distance": `${distance}px` } as React.CSSProperties) : {}),
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
