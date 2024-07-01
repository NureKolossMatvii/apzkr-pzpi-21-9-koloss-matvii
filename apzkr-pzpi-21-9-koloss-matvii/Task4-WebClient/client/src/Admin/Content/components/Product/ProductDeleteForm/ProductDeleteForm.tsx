import React, { useContext, useState } from 'react'
import { deleteProduct } from '../../../http/productApi'
import { IProduct } from '../../../pages/AdminProducts'
import formCl from '../../../../../styles/Form.module.css';
import { Button } from '../../../../../components/UI/Button/Button';
import { toast } from 'react-toastify';
import { Context } from '../../../../..';

interface IProps {
    fetchProducts: () => void,
    handleCloseDeleteModal: () => void,
    product?: IProduct
}

export const ProductDeleteForm = ({fetchProducts, handleCloseDeleteModal, product}:IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const contextValue = useContext(Context);
    const [language] = contextValue!.language;

    const handleDelete = async () => {
        if (product) {
            setLoading(true);
            await deleteProduct(product?.id).then(() => {
                fetchProducts();
                toast.success("Продукт успішно видалено")
                handleCloseDeleteModal();
            }).catch(() => {
                toast.error("Щось пішло не так, спробуйте ще раз");
            }).finally(() => setLoading(false))
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити категорію "{product && JSON.parse(product.name)[language]}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger" disabled={loading}>{loading ? "Завантаження..." : "Видалити"}</Button>
        </div>
    </>
  )
}
