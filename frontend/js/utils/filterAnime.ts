import { Anime, FilterChange, MalCategoryId } from "../types";

/**
 * Filters an array of Anime based on the provided filters.
 * @param allRecommendations - The full list of Anime recommendations.
 * @param filters - A list of FilterChanges containing filtering criteria.
 * @returns A filtered array of Anime.
 */
export const filterAnime = (
  allRecommendations: Anime[],
  filters: FilterChange[],
): Anime[] => {
  return allRecommendations.filter((anime) => {
    return filters.every(({ key, value }) => {
      if (value === undefined || value === null) return true; // Skip undefined or null filters

      switch (key) {
        case "includedGenres":
          return (value as MalCategoryId[]).every((genre) =>
            anime.genres.includes(genre),
          );
        case "excludedGenres":
          return !(value as MalCategoryId[]).some((genre) =>
            anime.genres.includes(genre),
          );
        case "staff":
          return (value as string[]).some((staffMember) =>
            anime.staff.includes(staffMember),
          );
        case "companies":
          return (value as string[]).some((company) =>
            anime.companies.includes(company),
          );
        case "malScoreMin":
          return anime.malScore >= (value as number);
        case "malScoreMax":
          return anime.malScore <= (value as number);
        case "memberMin":
          return anime.members >= (value as number);
        case "memberMax":
          return anime.members <= (value as number);
        case "earliestAiringStart":
          return anime.airingDate.start >= value;
        case "latestAiringStart":
          return anime.airingDate.start <= value;
        case "status":
          return value === anime.status;
        case "type":
          return value === anime.type; // TODO: Change behavior if type is other, as it means it should be anything not included in the other types
        case "episodeCountMin":
          return anime.episodeCount >= (value as number);
        case "episodeCountMax":
          return anime.episodeCount <= (value as number);
        default:
          return true; // Ignore unknown filter keys
      }
    });
  });
};
