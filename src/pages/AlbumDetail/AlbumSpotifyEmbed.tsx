export function AlbumSpotifyEmbed({ spotifyId }: { spotifyId: string }) {
  return (
    <div className="album-detail__spotify">
      <iframe
        src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify album player"
      />
    </div>
  );
}
