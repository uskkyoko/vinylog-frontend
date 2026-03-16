import { ButtonLink } from "../../components/Button";

export function ListDetailEmpty({
  listId,
  isOwner,
}: {
  listId: number;
  isOwner: boolean;
}) {
  return (
    <div className="list-details__empty">
      <h3 className="list-details__empty-title">This list is empty</h3>
      <p className="list-details__empty-text">
        The curator hasn't added any records yet.
      </p>
      {isOwner && (
        <ButtonLink to={`/lists/${listId}/edit`} variant="primary">
          Add Albums
        </ButtonLink>
      )}
    </div>
  );
}
