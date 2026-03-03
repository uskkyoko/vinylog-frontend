import type { ReviewOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function useReviews(username: string) {
  return useFetch<ReviewOut[]>(() => api.getReviews(username), []);
}
