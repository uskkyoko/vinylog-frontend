export { setAuthToken, UnauthorizedError } from "./http";

import { authApi } from "./auth";
import { usersApi } from "./users";
import { reviewsApi } from "./reviews";
import { albumsApi } from "./albums";
import { artistsApi } from "./artists";
import { listsApi } from "./lists";
import { searchApi } from "./search";

export const api = {
  ...authApi,
  ...usersApi,
  ...reviewsApi,
  ...albumsApi,
  ...artistsApi,
  ...listsApi,
  ...searchApi,
};
