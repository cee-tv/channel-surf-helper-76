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
        await shakaPlayerRef.current.unload();
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

      // Ensure old player is destroyed before creating new one
      await destroyPlayer();

      const player = new shaka.Player();
      await player.attach(videoRef.current);
      shakaPlayerRef.current = player;

      // Configure auto quality adjustment and network settings
      player.configure({
        abr: {
          enabled: true,
          defaultBandwidthEstimate: 1000000,
          switchInterval: 1,
          bandwidthUpgradeTarget: 0.85,
          bandwidthDowngradeTarget: 0.95
        },
        streaming: {
          bufferingGoal: 10,
          rebufferingGoal: 2,
          retryParameters: {
            maxAttempts: 3,
            baseDelay: 1000,
            backoffFactor: 2,
            timeout: 10000,
            fuzzFactor: 0.5
          }
        },
        manifest: {
          retryParameters: {
            maxAttempts: 3,
            baseDelay: 1000,
            backoffFactor: 2,
            timeout: 10000,
            fuzzFactor: 0.5
          }
        },
        net: {
          retryParameters: {
            maxAttempts: 3,
            baseDelay: 1000,
            backoffFactor: 2,
            timeout: 10000,
            fuzzFactor: 0.5
          }
        }
      });

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
            },
            retryParameters: {
              maxAttempts: 3,
              baseDelay: 1000,
              backoffFactor: 2,
              fuzzFactor: 0.5
            }
          }
        });
      }

      // Add advanced error handling
      player.addEventListener('error', function(event: any) {
        console.error('Error code', event.detail.code, 'object', event.detail);
      });

      await player.load(channel.url);
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
    let mounted = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/shaka-player@4.7.11/dist/shaka-player.compiled.js';
    script.async = true;
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      if (mounted) {
        // @ts-ignore
        window.shaka.net.NetworkingEngine.registerScheme(
          'http',
          // @ts-ignore
          window.shaka.net.HttpXHRPlugin
        );
        // @ts-ignore
        window.shaka.net.NetworkingEngine.registerScheme(
          'https',
          // @ts-ignore
          window.shaka.net.HttpXHRPlugin
        );
        initPlayer();
      }
    };
    
    document.body.appendChild(script);

    return () => {
      mounted = false;
      destroyPlayer();
      document.body.removeChild(script);
    };
  }, [channel]);

  return { videoRef, isLoading, error };
};