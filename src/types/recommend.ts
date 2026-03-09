export interface AlbumRecommendation {
  artist_name: string;
  album_title: string;
  reason: string;
}

export interface RecommendRequest {
  user_input?: string | null;
}

export interface RecommendResponse {
  artist_name: string;
  album_title: string;
  reason: string;
  original_prompt: string;
  album_id?: number | null;
  spotify_id?: string | null;
  cover_url?: string | null;
}
