import { $authhost, $host } from '../../../http';
import { createLinkWithParameters } from '../../../utils/createLinkWithParameters';
import { IProductCreateFormData } from '../components/Product/ProductCreate/ProductCreateForm';
import { IProductEditFormData } from '../components/Product/ProductEditForm/ProductEditForm';
import { IProductsRequest } from '../pages/AdminProducts';

export const createProduct = async (productData:IProductCreateFormData) => {
    const { data } = await $authhost.post('api/AdminProducts', productData);
    return data;
}

export const editProduct = async (productData:IProductEditFormData) => {
    const { data } = await $authhost.put('api/AdminProducts', productData);
    return data;
}

export const getProducts = async (request:IProductsRequest) => {
    const {data} = await $authhost.get(createLinkWithParameters('api/AdminProducts', request));
    return data;
}

export const generateArticle = async () => {
    const {data} = await $authhost.get('api/AdminProducts/article');
    return data;
}

export const deleteProduct = async (id:string) => {
    const { data } = await $authhost.delete('api/AdminProducts/' + id);
    return data;
}