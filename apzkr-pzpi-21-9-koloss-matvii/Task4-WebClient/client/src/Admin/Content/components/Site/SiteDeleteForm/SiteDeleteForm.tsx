import React, { useState } from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import formCl from '../../../../../styles/Form.module.css';
import { deleteSite } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';
import { toast } from 'react-toastify';

interface IProps {
    fetchSites: () => void,
    handleCloseDeleteModal: () => void,
    site?: ISite
}

export const SiteDeleteForm = ({fetchSites, handleCloseDeleteModal, site}:IProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if (site) {
            setLoading(true);
            await deleteSite(site?.id).then(() => {
                fetchSites();
                toast.error("Сайт успішно видалено")
                handleCloseDeleteModal();
            }).catch(({response}) => {
                if (response.status === 400) {
                    toast.error("Неможливо видалити сайт, тому що він прив'язаний до якогось товару");
                } else {
                    toast.error("Щось пішло не так, спробуйте ще раз");
                }
            }).finally(() => setLoading(false));
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити сайт "{site?.name}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger" disabled={loading}>{loading ? "Завантаження..." : "Видалити"}</Button>
        </div>
    </>
  )
}
