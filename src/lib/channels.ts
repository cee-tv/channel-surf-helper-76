export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

export const channels: Channel[] = [
  {
    id: "1",
    name: "Channel 1",
    url: "https://example.com/stream1",
    logo: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Channel 2",
    url: "https://example.com/stream2",
    logo: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Channel 3",
    url: "https://example.com/stream3",
    logo: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Channel 4",
    url: "https://example.com/stream4",
    logo: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Channel 5",
    url: "https://example.com/stream5",
    logo: "/placeholder.svg"
  }
];
