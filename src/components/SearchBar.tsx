import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search channels..."
        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};