import { useState } from "react";
import { Channel } from "@/lib/channels";
import { SearchBar } from "./SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChannelListProps {
  channels: Channel[];
  currentChannel: Channel | null;
  onChannelSelect: (channel: Channel) => void;
  onClose: () => void;
}

export const ChannelList = ({
  channels,
  currentChannel,
  onChannelSelect,
  onClose,
}: ChannelListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="absolute left-0 top-4 h-full w-72 bg-black/80 p-4 shadow-xl animate-slide-in-left">
        <h2 className="text-lg font-semibold text-white mb-4">Channels</h2>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <ScrollArea className="h-[calc(100vh-180px)] mt-4 pr-4">
          <div className="space-y-2">
            {filteredChannels.map((channel) => (
              <Button
                key={channel.id}
                variant={channel.id === currentChannel?.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  channel.id === currentChannel?.id 
                    ? "bg-white/20 text-white" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => onChannelSelect(channel)}
              >
                {channel.name}
              </Button>
            ))}
          </div>
        </ScrollArea>

        
      </div>
    </div>
  );
};
