import { ButtonLink } from "../../components/Button";

export function ReviewDetailHeader({ albumTitle }: { albumTitle: string }) {
  return (
    <header className="profile-section__header">
      <div>
        <p className="eyebrow">Review</p>
        <h1 className="profile-section__title">{albumTitle}</h1>
      </div>
      <ButtonLink to="/reviews" variant="ghost" size="sm">
        All reviews
      </ButtonLink>
    </header>
  );
}
