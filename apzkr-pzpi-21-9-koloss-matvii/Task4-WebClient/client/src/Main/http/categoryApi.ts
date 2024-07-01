import { $host } from "../../http";

export const getCategories = async () => {
    const {data} = await $host.get('api/Categories');
    return data;
}