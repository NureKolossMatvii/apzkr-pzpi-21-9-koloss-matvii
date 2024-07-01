import { $authhost, $host } from '../../../http';
import { ISiteCreateFormData } from '../components/Site/SiteCreateForm/SiteCreateForm';
import { ISiteEditFormData } from '../components/Site/SiteEditForm/SiteEditForm';

export const getSites = async () => {
    const {data} = await $authhost.get(`api/Sites`);
    return data;
}

export const createSite = async (formData:ISiteCreateFormData) => {
    const {data} = await $authhost.post(`api/Sites`, formData);
    return data;
}

export const editSite = async (formData:ISiteEditFormData) => {
    const { data } = await $authhost.put('api/Sites', formData);
    return data;
}

export const deleteSite = async (id:number) => {
    const { data } = await $authhost.delete('api/Sites/' + id);
    return data;
}