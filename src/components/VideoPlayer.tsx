import { useEffect, useRef } from "react";
import { Channel } from "@/lib/channels";
import 'shaka-player/dist/shaka-player.ui.js';
// @ts-ignore
const shaka = window.shaka;

interface VideoPlayerProps {
  channel: Channel;
  onBuffering?: (isBuffering: boolean) => void;
}

export const VideoPlayer = ({ channel, onBuffering }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shakaPlayerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const initPlayer = async () => {
      try {
        shaka.polyfill.installAll();
        if (!shaka.Player.isBrowserSupported()) {
          throw new Error("Browser not supported!");
        }

        const player = new shaka.Player(videoRef.current!);
        shakaPlayerRef.current = player;

        player.addEventListener("buffering", (event: any) => {
          onBuffering?.(event.buffering);
        });

        if (channel.drmKey) {
          const [keyId, key] = channel.drmKey.split(':');
          player.configure({
            drm: {
              clearKeys: {
                [keyId]: key
              }
            }
          });
        }

        await player.load(channel.url);
        videoRef.current?.play();
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    initPlayer();

    return () => {
      shakaPlayerRef.current?.destroy();
    };
  }, [channel]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-contain bg-black"
      controls
    />
  );
};