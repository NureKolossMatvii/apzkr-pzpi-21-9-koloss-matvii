import { $authhost, $host } from '../../../http';
import { ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { ICategoryEditFormData } from '../components/Category/CategoryEditForm/CategoryEditForm';

export const createCategory = async (categoryData:ICategoryCreateFormData) => {
    const { data } = await $authhost.post('api/Categories', categoryData);
    return data;
}

export const editCategory = async (categoryData:ICategoryEditFormData) => {
    const { data } = await $authhost.put('api/Categories', categoryData);
    return data;
}

export const getCategories = async () => {
    const {data} = await $authhost.get('api/Categories');
    return data;
}

export const getCategoriesWithoutParent = async () => {
    const {data} = await $authhost.get('api/Categories/withoutParent');
    return data;
}

export const deleteCategory = async (id:number) => {
    const { data } = await $authhost.delete('api/Categories/' + id);
    return data;
}