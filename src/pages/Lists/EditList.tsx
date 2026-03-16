import { useParams } from "react-router-dom";
import { AppLayout } from "../../components/AppLayout";
import { useAppSelector } from "../../hooks/hooks";
import { ListForm } from "./ListForm";
import "./Lists.css";

export default function EditList() {
  const { id } = useParams<{ id: string }>();
  const listId = Number(id);

  const list = useAppSelector((state) =>
    state.lists.items.find((l) => l.id === listId),
  );

  if (!list) {
    return (
      <AppLayout>
        <section className="list-form-page">
          <div className="list-form-page__card">
            <p>List not found.</p>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="list-form-page">
        <div className="list-form-page__card">
          <div className="list-form-page__header">
            <p className="eyebrow">Update your collection</p>
            <h1 className="list-form-page__title">Edit List</h1>
          </div>
          <ListForm list={list} />
        </div>
      </section>
    </AppLayout>
  );
}
