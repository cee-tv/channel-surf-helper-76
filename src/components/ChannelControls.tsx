import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu, Maximize2 } from "lucide-react";

interface ChannelControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onShowChannels: () => void;  
  onToggleFullscreen: () => void;
  channelName: string;
}

export const ChannelControls = ({
  onPrevious,
  onNext,
  onShowChannels,
  onToggleFullscreen,
  channelName,
}: ChannelControlsProps) => {
  return (
    <>
      <div className="absolute top-6 left-6 z-40">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
          onClick={onShowChannels}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute top-6 right-6 z-40 flex items-center gap-2 bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm animate-fade-in">
        <span className="text-white font-medium">{channelName}</span>
      </div>

      <div className="absolute bottom-8 inset-x-0 z-40 flex justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-8 right-6 z-40">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
          onClick={onToggleFullscreen}
        >
          <Maximize2 className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
};