import { ISelect } from "../../../components/UI/CustomSelect/CustomSelect";
import { ICategory } from "../../Content/pages/AdminCategories";
import { ISite } from "../../Content/pages/AdminSites";
import { getCategoryFullName } from "../getCategoryFullName";
import languages from '../../../trans/languages.json';

export const getSelectsCategoryItems = (categories:ICategory[]):ISelect[] => {
    const selects: ISelect[] = categories
      .map((category) => {return {value: category.id.toString(), label: getCategoryFullName(category)}});
    return selects;
}

export const getSelectsSiteItems = (sites:ISite[]):ISelect[] => {
    const selects: ISelect[] = sites.map((site) => {return {value: site.id.toString(), label: site.name}});
    return selects;
}