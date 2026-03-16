import type { RecommendRequest, RecommendResponse } from "../types";
import { mutateJSON } from "./http";

export const recommendApi = {
  generateRecommendation: (
    data: RecommendRequest,
  ): Promise<RecommendResponse> =>
    mutateJSON<RecommendResponse>("/recommend/generate", "POST", data),
};
