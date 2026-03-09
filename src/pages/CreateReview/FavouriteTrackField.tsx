import { FormField } from "../../components/FormField";
import { useAlbumTracks } from "../../hooks/useAlbumTracks";

interface Props {
  spotifyId: string | null;
  value: string;
  onChange: (track: string) => void;
}

export function FavouriteTrackField({ spotifyId, value, onChange }: Props) {
  const { data: tracks, loading } = useAlbumTracks(spotifyId);

  if (!spotifyId || (!loading && tracks.length === 0)) return null;

  return (
    <FormField label="Favourite Track (Optional)" htmlFor="favorite-song" className="review-form__field">
      <select
        className="form-field__input"
        id="favorite-song"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">{loading ? "Loading tracks…" : "None / Select a track"}</option>
        {tracks.map((track) => (
          <option key={track.track_number} value={track.name}>
            {track.track_number}. {track.name}
          </option>
        ))}
      </select>
    </FormField>
  );
}
