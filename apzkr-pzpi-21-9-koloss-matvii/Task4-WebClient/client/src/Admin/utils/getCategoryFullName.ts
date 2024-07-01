import { ICategory } from "../Content/pages/AdminCategories";
import languages from '../../trans/languages.json';

export const getCategoryFullName = (category: ICategory): string => {
  if (!category.parentCategory) {
    return JSON.parse(category.name)[languages.ua.title];
  }

  const parentFullName = getCategoryFullName(category.parentCategory);
  return `${JSON.parse(category.name)[languages.ua.title]} (${parentFullName})`;
};
