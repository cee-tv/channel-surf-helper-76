import { Channel } from "@/lib/types/channel";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useShaka } from "@/hooks/useShaka";
import { useVideoControls } from "@/hooks/useVideoControls";
import LoadingSpinner from "./LoadingSpinner";

interface VideoPlayerProps {
  channel: Channel;
}

export const VideoPlayer = ({ channel }: VideoPlayerProps) => {
  const { videoRef, isLoading, error } = useShaka(channel);
  const {
    isPlaying,
    volume,
    isMuted,
    showControls,
    setShowControls,
    togglePlay,
    toggleMute,
    updateVolume
  } = useVideoControls();

  if (error) {
    console.error("Video player error:", error);
  }

  return (
    <div 
      className="relative w-full h-full bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
      />

      {isLoading && <LoadingSpinner />}

      {/* Custom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => togglePlay(videoRef)}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => toggleMute(videoRef)}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <div className="w-24">
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="cursor-pointer"
              onValueChange={(value) => updateVolume(videoRef, value[0] / 100)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};