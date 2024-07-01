import React, { useState } from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import formCl from '../../../../../styles/Form.module.css';
import { IUser } from '../../../pages/AdminUsers';
import { deleteUser } from '../../../http/userApi';
import { toast } from 'react-toastify';

interface IProps {
    fetchUsers: () => void,
    handleCloseDeleteModal: () => void,
    user?: IUser
}

export const UserDeleteForm = ({fetchUsers, handleCloseDeleteModal, user}:IProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if (user) {
            setLoading(true);
            await deleteUser(user.login).then(() => {
                fetchUsers();
                toast.success("Акаунт успішно видалений")
                handleCloseDeleteModal();
            }).catch(({response}) => {
                toast.error("Щось пішло не так, спробуйте ще раз");
            }).finally(() => setLoading(false));
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити акаунт "{user?.login}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger" disabled={loading}>{loading ? "Завантаження..." : "Видалити"}</Button>
        </div>
    </>
  )
}
