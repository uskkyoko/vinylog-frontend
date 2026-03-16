import { Button } from "../../components/Button";

export interface FormAlbum {
  spotify_id: string;
  title: string;
  artist_name: string;
  cover_url: string | null;
}

export function SelectedAlbumItem({
  album,
  onRemove,
}: {
  album: FormAlbum;
  onRemove: (spotifyId: string) => void;
}) {
  return (
    <div className="list-form-page__selected-item">
      <div className="list-form-page__selected-item-info">
        {album.cover_url && (
          <img
            src={album.cover_url}
            alt={album.title}
            className="list-form-page__selected-item-image"
            width={40}
            height={40}
          />
        )}
        <div className="list-form-page__selected-item-details">
          <strong className="list-form-page__selected-item-title">
            {album.title}
          </strong>
          <span className="list-form-page__selected-item-artist">
            {album.artist_name}
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove(album.spotify_id)}
      >
        Remove
      </Button>
    </div>
  );
}
