import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';
import { editSite } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';
import formCl from '../../../../../styles/Form.module.css';
import { toast } from 'react-toastify';

export interface ISiteEditFormData {
    id: number,
    name: string,
  }
  
  interface IProps {
    fetchSites: () => void,
    handleCloseEditModal: () => void,
    site?: ISite,
  }

export const SiteEditForm = ({fetchSites, handleCloseEditModal, site}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<ISiteEditFormData>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:ISiteEditFormData) => {
        if (site !== undefined) {
            setLoading(true)
              await editSite({...data, id: site.id}).then(() => {
                fetchSites();
                toast.success("Сайт успішно відредаговано")
                handleCloseEditModal();
              }).catch(() => {
                toast.error("Щось пішло не так, спробуйте ще раз");
              }).finally(() => setLoading(false))
        }
    }
  
    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'name'}
            defaultValue={site?.name}
            rules={{
              required: "Введіть назву категорії",
              maxLength: {
                value: 20,
                message: 'Максимальна довжина категорії повинна бути не більше 20'
              },
              minLength: {
                value: 3,
                message: 'Мінімальна довжина не повинна бути менша за 3'
              },
            }}
            render={({ field }) => (
              <Input label={"Назва"} inputType="text" field={field}></Input>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.name?.message}</p>
        </div>
        <div className={formCl.buttons}>
          <Button type="button" onClick={handleCloseEditModal} variant='secondary'>Закрити</Button>
          <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Редагувати"}</Button>
        </div>
      </form>
        </div>
      )
}
