"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface AnimatedProjectImageProps {
  src: string;
  alt: string;
  videoSrc?: string;
  width?: number;
  height?: number;
}

export default function AnimatedProjectImage({
  src,
  alt,
  videoSrc,
  width = 1200,
  height = 1500,
}: AnimatedProjectImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (isHovering) {
      video.play().catch((err) => {
        console.warn("Video playback was interrupted or blocked:", err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovering, videoSrc]);

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-muted"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          isHovering && isPlaying ? "opacity-0" : "opacity-100"
        }`}
        priority
      />

      {videoSrc && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(e) => e.preventDefault()}
          preload="metadata"
          poster={src}
          width={width}
          height={height}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovering && isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {videoSrc.endsWith(".mp4") && (
            <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          )}
          <source src={videoSrc} type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
      )}
    </div>
  );
}
