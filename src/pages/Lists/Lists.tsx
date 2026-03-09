import "./Lists.css";
import { useLists } from "../../hooks/useLists";
import { AppLayout } from "../../components/AppLayout";
import { PageLoading } from "../../components/PageLoading";
import { ListsIntro } from "./ListsIntro";
import { ListCard } from "./ListCard";

export default function Lists() {
  const { data: lists, loading } = useLists();

  if (loading || !lists) return <PageLoading />;

  return (
    <AppLayout>
      <section className="lists-page">
        <div className="container">
          <ListsIntro />
          <div className="lists-page__grid">
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
