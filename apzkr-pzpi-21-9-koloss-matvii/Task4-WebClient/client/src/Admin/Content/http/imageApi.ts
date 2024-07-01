import { $authhost, $host } from '../../../http';

export const createImage = async (id:string, formData:FormData) => {
    const {data} = await $authhost.post(`api/Image/${id}`, formData);
    return data;
}

export const getImage = async (id:string) => {
    const {data} = await $authhost.get(`api/Image/${id}`);
    return data;
}