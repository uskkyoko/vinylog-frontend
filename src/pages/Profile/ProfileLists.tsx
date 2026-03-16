import { ButtonLink } from "../../components/Button";
import { AlbumPreviews } from "../Lists/ListCard";
import type { ListOut } from "../../types";

export function ProfileLists({
  lists,
  isOwner = true,
}: {
  lists: ListOut[];
  isOwner?: boolean;
}) {
  return (
    <section className="profile-section">
      <header className="profile-section__header">
        <div>
          <p className="eyebrow">Lists Shelf</p>
          <h2 className="profile-section__title">Currently on rotation</h2>
        </div>
        {isOwner && (
          <ButtonLink to="/lists/new" variant="ghost" size="sm">
            Add list
          </ButtonLink>
        )}
      </header>
      <div className="profile-lists">
        {lists.length === 0 ? (
          <div className="profile-lists__empty">
            <p>No lists yet. Start curating!</p>
          </div>
        ) : (
          lists.map((list) => <ProfileListCard key={list.id} list={list} />)
        )}
      </div>
    </section>
  );
}

function ProfileListCard({ list }: { list: ListOut }) {
  return (
    <article className="profile-lists__card">
      <div>
        <p className="profile-lists__title">{list.name}</p>
        {list.description && (
          <p className="profile-lists__meta">{list.description}</p>
        )}
        <AlbumPreviews albums={list.albums} />
      </div>
      <ButtonLink to={`/lists/${list.id}`} variant="ghost" size="sm">
        View
      </ButtonLink>
    </article>
  );
}
