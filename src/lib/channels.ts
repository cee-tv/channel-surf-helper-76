export interface Channel {
  id: string;
  name: string;
  url: string;
  drmUrl?: string;
}

export const channels: Channel[] = [
  {
    id: "1",
    name: "Demo Stream 1",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8"
  },
  {
    id: "2",
    name: "Demo Stream 2",
    url: "https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd"
  },
  // Add more channels as needed
];