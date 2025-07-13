'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export function ScrollAnimation({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    const baseTransition = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseTransition} opacity-0 translate-y-8`;
        case 'down':
          return `${baseTransition} opacity-0 -translate-y-8`;
        case 'left':
          return `${baseTransition} opacity-0 translate-x-8`;
        case 'right':
          return `${baseTransition} opacity-0 -translate-x-8`;
        case 'fade':
          return `${baseTransition} opacity-0`;
        default:
          return `${baseTransition} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseTransition} opacity-100 translate-y-0 translate-x-0`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
}