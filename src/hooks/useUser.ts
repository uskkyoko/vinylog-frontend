import type { UserOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function usePublicUser(username: string) {
  return useFetch<UserOut | null>(
    () => api.getCurrentUser(username),
    null,
    [username],
  );
}
