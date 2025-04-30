import { AnimeStatus } from "./animeStatus";
import { AnimeType } from "./animeType";
import { MalCategoryId } from "./malCategories";

export type FilterChange =
  | { key: "includedGenres"; value: MalCategoryId[] }
  | { key: "excludedGenres"; value: MalCategoryId[] }
  | { key: "staff"; value: string[] }
  | { key: "companies"; value: string[] }
  | { key: "malScoreMin"; value: number }
  | { key: "malScoreMax"; value: number }
  | { key: "memberMin"; value: number }
  | { key: "memberMax"; value: number }
  | { key: "earliestAiringStart"; value: Date }
  | { key: "latestAiringStart"; value: Date }
  | { key: "status"; value: AnimeStatus }
  | { key: "type"; value: AnimeType }
  | { key: "episodeCountMin"; value: number }
  | { key: "episodeCountMax"; value: number };

// TODO: Potentially add source (LN, Game, Manga, etc. as a filter?)
// TODO: Add user status (watching, completed, on-hold, dropped, plan to watch) as a filter?
export type Filters = {
  includedGenres: MalCategoryId[];
  excludedGenres: MalCategoryId[];
  staff: string[];
  companies: string[];
  malScoreMin: number;
  malScoreMax: number;
  memberMin: number;
  memberMax: number;
  earliestAiringStart: Date | null;
  latestAiringStart: Date | null;
  status: AnimeStatus;
  type: AnimeType;
  episodeCountMin: number;
  episodeCountMax: number;
};
