import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderBg?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

export default function LazyImage({
  src,
  alt,
  className = "",
  placeholderBg = "bg-gray-200",
  width,
  height,
  loading = "lazy",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(loading === "eager");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === "eager") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : undefined}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
