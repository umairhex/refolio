"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ImageDimensions {
  width?: number;
  height?: number;
}

interface ImageDisplayOptions {
  objectPosition?: "top" | "center" | "bottom";
  forcePlay?: boolean;
  priority?: boolean;
}

interface AnimatedProjectImageProps extends ImageDimensions, ImageDisplayOptions {
  src: string;
  alt: string;
  videoSrc?: string;
}

const POSITION_CLASS: Record<string, string> = {
  top: "object-top",
  bottom: "object-bottom",
  center: "object-center",
};

const getPositionClass = (pos: string) => POSITION_CLASS[pos] ?? "object-center";

export default function AnimatedProjectImage({
  src,
  alt,
  videoSrc,
  width = 1200,
  height = 1500,
  forcePlay = false,
  priority = false,
  objectPosition = "center",
}: AnimatedProjectImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (isHovering || forcePlay) {
      video.play().catch((err) => {
        console.warn("Video playback was interrupted or blocked:", err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovering, forcePlay, videoSrc]);

  return (
    <div
      className="bg-muted relative h-full w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-700 ease-in-out ${getPositionClass(objectPosition)} ${(isHovering || forcePlay) && isPlaying ? "opacity-0" : "opacity-100"}`}
        priority={priority}
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
          preload="auto"
          poster={src}
          width={width}
          height={height}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${getPositionClass(objectPosition)} ${(isHovering || forcePlay) && isPlaying ? "opacity-100" : "opacity-0"}`}
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
