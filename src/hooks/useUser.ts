import type { UserOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function usePublicUser(username: string | null) {
  return useFetch<UserOut | null>(
    () => (username ? api.getCurrentUser(username) : Promise.resolve(null)),
    null,
    [username],
  );
}
