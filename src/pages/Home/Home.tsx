import "./Home.css";
import { useUser } from "../../hooks/useUser";
import { useFeaturedAlbums } from "../../hooks/useAlbums";
import { useArtists } from "../../hooks/useArtists";
import { useLists } from "../../hooks/useLists";
import { HomeHero } from "../../components/HomeHero/HomeHero";
import { HomePanel, HomeListItem } from "../../components/HomePanel/HomePanel";
import { HomeRecommend } from "../../components/HomeRecommend/HomeRecommend";

const CURRENT_USERNAME = "uskyoko";

export default function Home() {
  const { data: currentUser, loading } = useUser(CURRENT_USERNAME);
  const { data: featuredAlbums } = useFeaturedAlbums();
  const { data: trendingArtists } = useArtists();
  const { data: communityLists } = useLists();

  if (loading) {
    return (
      <section className="profile">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <HomeHero user={currentUser}></HomeHero>

      <hr className="divider" />

      <section className="home-panels">
        <div className="container">
          <div className="home-panels__grid">
            <HomePanel
              eyebrow="Spin Today"
              title="Featured Albums"
              browseTo="/albums"
              isEmpty={featuredAlbums.length === 0}
              emptyMessage="No albums available yet."
            >
              {featuredAlbums.map((album) => (
                <HomeListItem
                  key={album.id}
                  primary={album.title}
                  meta={`${album.artist?.name || "Unknown artist"} · ${album.release_date}`}
                  to={`/albums/${album.id}`}
                />
              ))}
            </HomePanel>

            <HomePanel
              eyebrow="On the Rise"
              title="Trending Artists"
              isEmpty={trendingArtists.length === 0}
              emptyMessage="No artists available yet."
            >
              {trendingArtists.map((artist) => (
                <HomeListItem
                  key={artist.id}
                  primary={artist.name}
                  meta={artist.debut_date ? `Debut ${artist.debut_date}` : ""}
                  to={`/artists/${artist.id}`}
                />
              ))}
            </HomePanel>

            <HomePanel
              eyebrow="Community Curated"
              title="Fresh Lists"
              browseTo="/lists"
              isEmpty={communityLists.length === 0}
              emptyMessage="No lists have been created yet."
            >
              {communityLists.map((list) => (
                <HomeListItem
                  key={list.id}
                  primary={list.name}
                  meta={`${list.user?.username || "Anonymous"} · ${list.albums?.length || 0} albums`}
                  to={`/lists/${list.id}`}
                  ctaText="View"
                />
              ))}
            </HomePanel>
          </div>
        </div>
      </section>

      <HomeRecommend user={currentUser}></HomeRecommend>
    </>
  );
}
