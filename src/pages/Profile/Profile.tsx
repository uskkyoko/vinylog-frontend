import "./Profile.css";
import { AppLayout } from "../../components/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { useAppSelector } from "../../hooks/hooks";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileLists } from "./ProfileLists";
import { ProfileReviews } from "./ProfileReviews";

export default function Profile() {
  const { user } = useAuth();
  const lists = useAppSelector((state) => state.lists.items);
  const reviews = useAppSelector((state) => state.reviews.items);
  const favouriteAlbums = useAppSelector((state) => state.users.favouriteAlbums);

  if (!user) return null;

  return (
    <AppLayout>
      <section className="profile">
        <div className="container">
          <ProfileHeader user={user} favouriteAlbums={favouriteAlbums} />
          <div className="profile__sections">
            <ProfileLists lists={lists} />
            <ProfileReviews reviews={reviews} username={user.username} />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
