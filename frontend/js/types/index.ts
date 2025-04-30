export { Anime } from "./anime";
export { Filters, FilterChange } from "./filters";
export { AnimeType } from "./animeType";
export { AnimeStatus } from "./animeStatus";
export { MalCategoryId, MalCategoryName } from "./malCategories";

declare global {
  interface Window {
    SENTRY_DSN: string;
    COMMIT_SHA: string;

    Urls: unknown;
  }
}
