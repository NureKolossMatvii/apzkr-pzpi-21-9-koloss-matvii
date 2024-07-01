import React, { useContext, useState } from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import { deleteCategory } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import cl from './CategoryDeleteForm.module.css';
import formCl from '../../../../../styles/Form.module.css';
import { toast } from 'react-toastify';
import { Context } from '../../../../..';

interface IProps {
    fetchCategories: () => void,
    handleCloseDeleteModal: () => void,
    category?: ICategory
}

export const CategoryDeleteForm = ({fetchCategories, handleCloseDeleteModal, category}:IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const contextValue = useContext(Context);
    const [language] = contextValue!.language;

    const handleDelete = async () => {
        if (category) {
            setLoading(true);
            await deleteCategory(category?.id).then(() => {
                fetchCategories();
                toast.success("Успішно видалено")
                handleCloseDeleteModal();
            }).catch(({response}) => {
                if (response.status === 400) {
                    toast.error("Неможливо видалити категорії, тому що вона прив'язана до якогось товару, або дочірня категорія прив'язана до товару");
                } else {
                    toast.error("Невідома помилка")
                }
            }).finally(() => setLoading(false))
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити категорію "{category && JSON.parse(category.name)[language]}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger" disabled={loading}>{loading ? "Завантаження..." : "Видалити"}</Button>
        </div>
    </>
  )
}
