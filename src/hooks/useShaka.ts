import { useEffect, useRef, useState } from "react";
import { Channel } from "@/lib/types/channel";

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

      // Configure player with optimized settings
      player.configure({
        streaming: {
          bufferingGoal: 60,
          rebufferingGoal: 30,
          bufferBehind: 60,
          retryParameters: {
            maxAttempts: 10,
            baseDelay: 1000,
            backoffFactor: 2,
            timeout: 60000,
            fuzzFactor: 0.5
          },
          failureCallback: (error: any) => {
            console.error("Streaming failure:", error);
            setError("Streaming error: " + error.message);
          }
        },
        manifest: {
          retryParameters: {
            maxAttempts: 10,
            baseDelay: 1000,
            backoffFactor: 2,
            timeout: 60000,
            fuzzFactor: 0.5
          }
        },
        abr: {
          enabled: true,
          defaultBandwidthEstimate: 1000000,
          switchInterval: 8,
          bandwidthUpgradeTarget: 0.85,
          bandwidthDowngradeTarget: 0.95
        }
      });

      player.addEventListener("error", (event: any) => {
        console.error("Player error:", event.detail);
        setError(event.detail.message);
      });

      // Add DRM configuration if needed
      if (channel.drmKey) {
        console.log("Configuring DRM for channel:", channel.name);
        const [keyId, key] = channel.drmKey.split(':');
        await player.configure({
          drm: {
            clearKeys: {
              [keyId]: key
            },
            retryParameters: {
              maxAttempts: 5,
              baseDelay: 1000,
              backoffFactor: 2,
              fuzzFactor: 0.5
            },
            advanced: {
              'org.w3.clearkey': {
                distinctiveIdentifierRequired: false,
                persistentStateRequired: false
              }
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