import "./Home.css";
import { AppLayout } from "../../components/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { useFeaturedAlbums } from "../../hooks/useAlbums";
import { useArtists } from "../../hooks/useArtists";
import { useLists } from "../../hooks/useLists";
import { HomeHero } from "./HomeHero";
import { HomePanels } from "./HomePanels";
import { HomeRecommend } from "./HomeRecommend";

export default function Home() {
  const { user } = useAuth();
  const { data: featuredAlbums } = useFeaturedAlbums();
  const { data: trendingArtists } = useArtists();
  const { data: communityLists } = useLists();

  return (
    <AppLayout>
      <HomeHero user={user} />
      <hr className="divider" />
      <HomePanels
        featuredAlbums={featuredAlbums}
        trendingArtists={trendingArtists}
        communityLists={communityLists}
      />
      <HomeRecommend user={user} />
    </AppLayout>
  );
}
