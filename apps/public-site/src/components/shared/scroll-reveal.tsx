"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  distance?: number; // Distance in pixels (for up/down/left/right)
  threshold?: number; // Intersection threshold (0.0 - 1.0)
  stagger?: boolean; // If true, adds stagger effect to direct children
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 750,
  distance = 28,
  threshold = 0.12,
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If running in environment without IntersectionObserver or user prefers reduced motion, show immediately
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Trigger once to avoid scroll overhead
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // Trigger slightly before element is fully in view for seamless smoothness
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Compute transform offset based on direction
  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";

    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "scale":
        return `translate3d(0, ${Math.round(distance / 2)}px, 0) scale(0.96)`;
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Custom luxury ease-out
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
    backfaceVisibility: "hidden",
  };

  return (
    <Component
      ref={elementRef}
      style={style}
      className={`transform-gpu ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * Helper component for staggering a list of items on scroll
 */
interface StaggerRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  distance?: number;
  threshold?: number;
  as?: React.ElementType;
}

export function StaggerRevealGroup({
  children,
  className = "",
  staggerDelay = 90,
  baseDelay = 0,
  direction = "up",
  distance = 24,
  threshold = 0.1,
  as: Component = "div",
}: StaggerRevealGroupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
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

  return (
    <Component ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const childDelay = baseDelay + index * staggerDelay;

        const getTransform = () => {
          if (isVisible) return "translate3d(0, 0, 0) scale(1)";
          switch (direction) {
            case "up":
              return `translate3d(0, ${distance}px, 0)`;
            case "down":
              return `translate3d(0, -${distance}px, 0)`;
            case "left":
              return `translate3d(${distance}px, 0, 0)`;
            case "right":
              return `translate3d(-${distance}px, 0, 0)`;
            case "scale":
              return "translate3d(0, 14px, 0) scale(0.96)";
            case "fade":
            default:
              return "translate3d(0, 0, 0)";
          }
        };

        const itemStyle: React.CSSProperties = {
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          transitionProperty: "opacity, transform",
          transitionDuration: "700ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${childDelay}ms`,
          willChange: isVisible ? "auto" : "opacity, transform",
          backfaceVisibility: "hidden",
        };

        return (
          <div style={itemStyle} className="transform-gpu h-full w-full">
            {child}
          </div>
        );
      })}
    </Component>
  );
}
