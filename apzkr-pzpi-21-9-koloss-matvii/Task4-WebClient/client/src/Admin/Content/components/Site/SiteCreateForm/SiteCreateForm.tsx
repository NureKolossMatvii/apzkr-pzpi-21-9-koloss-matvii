import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ISite } from '../../../pages/AdminSites'
import formCl from '../../../../../styles/Form.module.css';
import cl from './SiteCreateForm.module.css'
import { Input } from '../../../../../components/UI/Input/Input';
import { Button } from '../../../../../components/UI/Button/Button';
import { createSite } from '../../../http/siteApi';
import { toast } from 'react-toastify';

export interface ISiteCreateFormData {
    name:string,
}

export interface IForm {
  name:string,
}

  interface IProps {
    fetchSites: () => void,
    handleCloseCreateModal: () => void
  }

export const SiteCreateForm = ({fetchSites, handleCloseCreateModal}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<IForm>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:IForm) => {
      setLoading(true);
      await createSite(data).then(() => {
        fetchSites();
        toast.success("Сайт успішно створено")
        handleCloseCreateModal();
      }).catch(() => {
        toast.error("Щось пішло не так, спробуйте ще раз")
      }).finally(() => setLoading(false));
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'name'}
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
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Створити"}</Button>
      </div>
    </form>
      </div>
    )
}