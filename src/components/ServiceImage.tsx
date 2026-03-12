"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ServiceImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ServiceImage({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  ...props 
}: ServiceImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Check for poisoned URLs (imhttps typo)
  const isPoisoned = typeof src === "string" && src.includes("imhttps");

  if (hasError || isPoisoned) {
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={alt}
        unoptimized
      />
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
