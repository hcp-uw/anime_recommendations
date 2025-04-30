import { AnimeStatus } from "./animeStatus";
import { AnimeType } from "./animeType";
import { MalCategoryId } from "./malCategories";

export type Anime = {
  id: number;
  name: string;
  synopsis: string;
  malUrl: string;
  imageUrl: string;
  genres: MalCategoryId[];
  staff: string[];
  companies: string[];
  malScore: number;
  members: number;
  airingDate: { start: Date; end?: Date };
  status: AnimeStatus;
  type: AnimeType;
  episodeCount: number;
};
