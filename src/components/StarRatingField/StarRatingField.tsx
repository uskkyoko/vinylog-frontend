const STARS = [5, 4, 3, 2, 1] as const;

interface Props {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRatingField({ value, onChange }: Props) {
  return (
    <div className="star-rating">
      {STARS.map((star) => (
        <label key={star} htmlFor={`star${star}`} title={`${star} stars`}>
          <input
            type="radio"
            id={`star${star}`}
            name="rating"
            value={star}
            checked={value === star}
            onChange={() => onChange(star)}
          />
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </label>
      ))}
    </div>
  );
}
