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
    <div className="fixed inset-0 bg-black/80 z-50 animate-fade-in">
      <div className="absolute right-0 top-0 h-full w-80 bg-background/95 p-4 shadow-lg animate-slide-in-right">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Channels</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-2">
            {filteredChannels.map((channel) => (
              <Button
                key={channel.id}
                variant={channel.id === currentChannel?.id ? "secondary" : "ghost"}
                className="w-full justify-start"
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