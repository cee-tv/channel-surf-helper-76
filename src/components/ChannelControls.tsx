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
      <div className="absolute top-4 left-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={onShowChannels}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-md backdrop-blur-sm animate-fade-in">
        <span className="text-sm text-white font-medium">{channelName}</span>
      </div>

      <div className="absolute inset-y-0 left-0 z-40 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 z-40 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={onToggleFullscreen}
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};