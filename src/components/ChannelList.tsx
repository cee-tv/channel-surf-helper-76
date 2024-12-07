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
      <div className="absolute left-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-6 shadow-2xl animate-slide-in-left">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Channels</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          <div className="space-y-2">
            {filteredChannels.map((channel) => (
              <Button
                key={channel.id}
                variant={channel.id === currentChannel?.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left transition-all duration-200 ${
                  channel.id === currentChannel?.id 
                    ? "bg-white/20 text-white shadow-lg" 
                    : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
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