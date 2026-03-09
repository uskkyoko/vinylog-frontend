import { Link } from "react-router-dom";

interface HomeListItemProps {
  primary: string;
  meta: string;
  to: string;
  ctaText?: string;
}

interface HomePanelProps {
  eyebrow: string;
  title: string;
  browseTo?: string;
  children: React.ReactNode;
  isEmpty: boolean;
  emptyMessage: string;
}

export function HomeListItem({
  primary,
  meta,
  to,
  ctaText = "Open",
}: HomeListItemProps) {
  return (
    <li className="home-list__item">
      <div>
        <p className="home-list__primary">{primary}</p>
        <p className="home-list__meta">{meta}</p>
      </div>
      <Link className="home-list__cta" to={to}>
        {ctaText}
      </Link>
    </li>
  );
}

export function HomePanel({
  eyebrow,
  title,
  browseTo,
  children,
  isEmpty,
  emptyMessage,
}: HomePanelProps) {
  return (
    <article className="home-panel">
      <header className="home-panel__header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="home-panel__title">{title}</h2>
        </div>
        {browseTo && (
          <Link className="home-panel__link" to={browseTo}>
            Browse
          </Link>
        )}
      </header>
      <ul className="home-list">
        {isEmpty ? (
          <li className="home-list__item">
            <p className="home-list__meta">{emptyMessage}</p>
          </li>
        ) : (
          children
        )}
      </ul>
    </article>
  );
}
