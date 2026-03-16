import { useState } from "react";
import { useAlbumSearch } from "../../hooks/useAlbumSearch";
import { Button } from "../Button";
import type { AlbumSearchResult } from "../../types";

interface Props {
  value: AlbumSearchResult | null;
  onChange: (album: AlbumSearchResult | null) => void;
}

export function AlbumPickerField({ value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const { results } = useAlbumSearch(query);

  function selectAlbum(album: AlbumSearchResult) {
    onChange(album);
    setQuery("");
  }

  if (value) {
    return (
      <div className="album-picker__selected">
        {value.image && (
          <img
            src={value.image}
            alt={value.title}
            width={48}
            className="album-picker__thumb"
          />
        )}
        <span className="album-picker__selected-title">
          {value.title} — {value.artist_name}
        </span>
        <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
          Remove
        </Button>
      </div>
    );
  }

  return (
    <div className="album-picker">
      <input
        className="form-field__input"
        type="text"
        id="album-search"
        placeholder="Search albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && results.length > 0 && (
        <div className="album-picker__results">
          {results.map((result) => (
            <div key={result.id} className="album-picker__item">
              {result.image && (
                <img src={result.image} width={40} alt={result.title} />
              )}
              <span className="album-picker__item-title">
                {result.title} — {result.artist_name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectAlbum(result)}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
