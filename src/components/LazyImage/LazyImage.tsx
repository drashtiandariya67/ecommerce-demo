"use client";
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <picture>
      <source srcSet={src.replace(".png", ".webp")} type="image/webp" />
      <img src={src} alt={alt} loading="lazy" decoding="async" className={className} />
    </picture>
  )
}

export default LazyImage;