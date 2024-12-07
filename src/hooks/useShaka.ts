import { useEffect, useRef, useState } from "react";
import { Channel } from "@/lib/channels";

export const useShaka = (channel: Channel) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shakaPlayerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const destroyPlayer = async () => {
    if (shakaPlayerRef.current) {
      try {
        await shakaPlayerRef.current.destroy();
        shakaPlayerRef.current = null;
      } catch (error) {
        console.error("Error destroying player:", error);
      }
    }
  };

  const initPlayer = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // @ts-ignore
      const shaka = window.shaka;
      if (!videoRef.current || !shaka) {
        throw new Error("Video element or Shaka not available");
      }

      await destroyPlayer();
      const player = new shaka.Player();
      await player.attach(videoRef.current);
      shakaPlayerRef.current = player;

      // Performance optimized configuration
      player.configure({
        streaming: {
          bufferingGoal: 5,
          rebufferingGoal: 2,
          bufferBehind: 15,
          retryParameters: {
            maxAttempts: 2,
            baseDelay: 250,
            backoffFactor: 1.2,
            timeout: 10000
          },
          lowLatencyMode: true,
          preferredAudioChannelCount: 2,
          preferFasterQualityChange: true
        },
        manifest: {
          retryParameters: {
            maxAttempts: 2,
            baseDelay: 250,
            backoffFactor: 1.2,
            timeout: 10000
          },
          // Disable HLS manifest parsing
          dash: {
            enabled: true
          },
          hls: {
            enabled: false
          }
        },
        abr: {
          enabled: false,
          defaultBandwidthEstimate: 500000
        }
      });

      setTimeout(() => {
        player.configure('abr.enabled', true);
      }, 5000);

      player.addEventListener("error", (event: any) => {
        console.error("Player error:", event.detail);
        setError(event.detail.message);
      });

      if (channel.drmKey) {
        const [keyId, key] = channel.drmKey.split(':');
        await player.configure({
          drm: {
            clearKeys: {
              [keyId]: key
            }
          }
        });
      }

      console.log("Loading channel URL:", channel.url);
      await player.load(channel.url);
      console.log("Channel loaded successfully");
      
      if (videoRef.current) {
        videoRef.current.play();
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error initializing player:", error);
      setError(error.message || "Failed to load video");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/shaka-player@4.7.11/dist/shaka-player.compiled.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      window.shaka.polyfill.installAll();
      initPlayer();
    };
    document.body.appendChild(script);

    return () => {
      destroyPlayer();
      document.body.removeChild(script);
    };
  }, [channel]);

  return { videoRef, isLoading, error };
};