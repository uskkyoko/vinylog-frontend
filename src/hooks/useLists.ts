import type { ListOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function useLists() {
  return useFetch<ListOut[]>(api.getLists, []);
}

