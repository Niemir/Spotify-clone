export interface TrackInfo {
  album: any;
  artists: {
    name: string;
    id: string;
    type: string;
    uri: string;
    href: string;
  }[];
  available_markets: any;
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: any;
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: true;
  track_number: number;
  type: string;
  uri: string;
}
export interface Track {
  added_at: Date;
  // added_by: {external_urls: {…}, href: 'https://api.spotify.com/v1/users/', id: '', type: 'user', uri: 'spotify:user:'}
  is_local: boolean;
  primary_color: null | string;
  track: TrackInfo;
  video_thumbnail: { url: string };
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  owner: { display_name: string; href: string; id: string; type: string };
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
    items: Track[];
  };
  type: string;
  uri: string;
}
export interface PlaylistBody {
  body: {
    items: Playlist[];
  };
}
