import { malCategories } from "../constants/malCategories";

export type MalCategoryId = keyof typeof malCategories;
export type MalCategoryName = (typeof malCategories)[MalCategoryId];
