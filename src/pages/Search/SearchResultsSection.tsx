import type { ReactNode } from "react";

export function SearchResultsSection({
  title,
  gridClass = "grid--four",
  children,
}: {
  title: string;
  gridClass?: string;
  children: ReactNode;
}) {
  return (
    <section className="search-results__section">
      <h2 className="search-results__section-title">{title}</h2>
      <div className={`grid ${gridClass}`}>{children}</div>
    </section>
  );
}
