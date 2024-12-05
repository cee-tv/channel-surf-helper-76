import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChannelList } from "@/components/ChannelList";
import { ChannelControls } from "@/components/ChannelControls";
import { channels, Channel } from "@/lib/channels";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [currentChannel, setCurrentChannel] = useState<Channel>(channels[0]);
  const [showChannels, setShowChannels] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const handlePreviousChannel = () => {
    const currentIndex = channels.findIndex((c) => c.id === currentChannel.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : channels.length - 1;
    setCurrentChannel(channels[previousIndex]);
  };

  const handleNextChannel = () => {
    const currentIndex = channels.findIndex((c) => c.id === currentChannel.id);
    const nextIndex = currentIndex < channels.length - 1 ? currentIndex + 1 : 0;
    setCurrentChannel(channels[nextIndex]);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <VideoPlayer
        channel={currentChannel}
        onBuffering={setIsBuffering}
      />

      <ChannelControls
        channelName={currentChannel.name}
        onPrevious={handlePreviousChannel}
        onNext={handleNextChannel}
        onShowChannels={() => setShowChannels(true)}
      />

      {showChannels && (
        <ChannelList
          channels={channels}
          currentChannel={currentChannel}
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);
            setShowChannels(false);
          }}
          onClose={() => setShowChannels(false)}
        />
      )}

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
    </div>
  );
};

export default Index;