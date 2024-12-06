import { Channel } from "@/lib/channels";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useShaka } from "@/hooks/useShaka";
import { useVideoControls } from "@/hooks/useVideoControls";

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

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full w-12 h-12"
            onClick={() => togglePlay(videoRef)}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full w-12 h-12"
            onClick={() => toggleMute(videoRef)}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>

          <div className="w-32">
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