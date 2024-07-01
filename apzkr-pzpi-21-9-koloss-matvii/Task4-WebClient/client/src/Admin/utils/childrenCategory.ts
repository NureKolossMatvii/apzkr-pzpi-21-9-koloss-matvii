import { ICategory } from "../Content/pages/AdminCategories";

export const getChildrenCategories = (categories:ICategory[]) => {
    return categories.filter((category:ICategory) => {
        const hasChildren = categories.some((child:ICategory) => child.parentCategoryId === category.id);
        return !hasChildren;
    });
}