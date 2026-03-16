import type { RecommendResponse } from "../../types";
import { Button, ButtonLink } from "../../components/Button";

interface RecommendResultProps {
  result: RecommendResponse;
  onReset: () => void;
}

export function RecommendResult({ result, onReset }: RecommendResultProps) {
  const prompt = result.original_prompt?.trim() || "Based on your music taste";

  return (
    <div className="recommend--result">
      <div className="recommend-result__container">
        <div className="recommend-result__header">
          <h2 className="recommend-result__title">{prompt}</h2>
        </div>

        <div className="recommend-result__card">
          <div className="recommend-result__media">
            {result.cover_url ? (
              <img src={result.cover_url} alt={`${result.album_title} cover`} />
            ) : (
              <div className="recommend-result__placeholder">No cover</div>
            )}
          </div>

          <div className="recommend-result__info">
            <h3 className="recommend-result__album">{result.album_title}</h3>
            <p className="recommend-result__artist">{result.artist_name}</p>
            <blockquote className="recommend-result__reason">{result.reason}</blockquote>
            <div className="recommend-result__actions">
              {(result.spotify_id ?? result.album_id) && (
                <ButtonLink to={`/albums/${result.spotify_id ?? result.album_id}`} variant="primary">
                  See album details
                </ButtonLink>
              )}
              <Button variant="ghost" onClick={onReset}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
