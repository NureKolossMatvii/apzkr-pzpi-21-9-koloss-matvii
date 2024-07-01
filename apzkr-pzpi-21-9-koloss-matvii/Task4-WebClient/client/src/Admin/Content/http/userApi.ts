import { $authhost, $host } from '../../../http';
import { IUserCreateFormData } from '../components/User/UserCreate/UserCreateForm';
import { IUserEditFormData } from '../components/User/UserEditForm/UserEditForm';

export const createUser = async (userData:IUserCreateFormData) => {
    const { data } = await $authhost.post('api/Auth/registerManager', userData);
    return data;
}

export const getUsers = async () => {
    const {data} = await $authhost.get('api/Auth');
    return data;
}

export const deleteUser = async (login: string) => {
    const {data} = await $authhost.delete('api/Auth/' + login);
    return data;
}

export const editUser = async (formData: IUserEditFormData) => {
    const {data} = await $authhost.patch('api/Auth', formData);
    return data;
}