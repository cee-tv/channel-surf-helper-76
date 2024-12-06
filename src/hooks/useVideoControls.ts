import { useState, useRef } from "react";

export const useVideoControls = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    if (isMuted) {
      setVolume(1);
      videoRef.current.volume = 1;
    } else {
      setVolume(0);
      videoRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const updateVolume = (videoRef: React.RefObject<HTMLVideoElement>, newVolume: number) => {
    if (!videoRef.current) return;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  return {
    isPlaying,
    volume,
    isMuted,
    showControls,
    setShowControls,
    togglePlay,
    toggleMute,
    updateVolume
  };
};