import { AppLayout } from "../../components/AppLayout";
import { ListForm } from "./ListForm";
import "./Lists.css";

export default function CreateList() {
  return (
    <AppLayout>
      <section className="list-form-page">
        <div className="list-form-page__card">
          <div className="list-form-page__header">
            <p className="eyebrow">Curate your collection</p>
            <h1 className="list-form-page__title">Create a New List</h1>
          </div>
          <ListForm />
        </div>
      </section>
    </AppLayout>
  );
}
