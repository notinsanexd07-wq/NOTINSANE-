import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
  variants?: any;
}

export default function LazyImage({ src, alt, className = "", referrerPolicy, variants }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport for a seamless experience
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden bg-white/[0.01] ${className}`}
    >
      {/* Loading Pulse Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/[0.03] animate-pulse rounded-2xl" />
      )}

      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy={referrerPolicy}
          onLoad={() => setIsLoaded(true)}
          variants={variants}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.85 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
