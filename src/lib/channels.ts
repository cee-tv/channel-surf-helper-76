export interface Channel {
  id: string;
  name: string;
  url: string;
  drmKey?: string;
}

export const channels: Channel[] = [
  {
    id: "1",
    name: "KBS World",
    url: "https://kbsworld-ott.akamaized.net/hls/live/2002341/kbsworld/master.m3u8"
  },
  {
    id: "2",
    name: "TV5 HD",
    url: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
    drmKey: "2615129ef2c846a9bbd43a641c7303ef:07c7f996b1734ea288641a68e1cfdc4d"
  }
];