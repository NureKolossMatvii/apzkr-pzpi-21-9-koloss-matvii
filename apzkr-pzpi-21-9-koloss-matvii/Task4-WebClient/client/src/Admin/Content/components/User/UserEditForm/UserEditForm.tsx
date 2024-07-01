import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';
import { IUser } from '../../../pages/AdminUsers';
import formCl from '../../../../../styles/Form.module.css';
import cl from './UserEditForm.module.css';
import { editUser } from '../../../http/userApi';
import { toast } from 'react-toastify';

export interface IUserEditFormData {
    login: string,
    currentPassword: string,
    newPassword: string,
  }
  
  interface IProps {
    fetchUsers: () => void,
    handleCloseEditModal: () => void,
    user?: IUser,
  }

export const UserEditForm = ({fetchUsers, handleCloseEditModal, user}:IProps) => {
    const { handleSubmit, control, formState: {errors} } = useForm<IUserEditFormData>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:IUserEditFormData) => {
        if (user !== undefined) {
            setLoading(true)
              await editUser(data).then(() => {
                fetchUsers();
                toast.success("Пароль успішно відредаговано")
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
          name={'login'}
          defaultValue={user?.login}
          rules={{
            required: "Введіть логін",
            maxLength: {
              value: 10,
              message: 'Максимальна довжина логіну повинна бути не більше 10'
            },
            minLength: {
              value: 5,
              message: 'Мінімальна довжина не повинна бути менша за 5'
            },
          }}
          render={({ field }) => (
            <Input disabled={true} label={"Логін"} inputType="text" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.login?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'currentPassword'}
          rules={{
            required: "Введіть старий пароль",
            maxLength: {
              value: 15,
              message: 'Максимальна довжина паролю повинна бути не більше 15'
            },
            minLength: {
              value: 6,
              message: 'Мінімальна довжина не повинна бути менша за 6'
            },
          }}
          render={({ field }) => (
            <Input label={"Старий пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.currentPassword?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'newPassword'}
          rules={{
            required: "Введіть новий пароль",
            maxLength: {
              value: 15,
              message: 'Максимальна довжина паролю повинна бути не більше 15'
            },
            minLength: {
              value: 6,
              message: 'Мінімальна довжина не повинна бути менша за 6'
            }
          }}
          render={({ field }) => (
            <Input label={"Введіть новий пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.newPassword?.message}</p>
      </div>
        <div className={formCl.buttons}>
          <Button type="button" onClick={handleCloseEditModal} variant='secondary'>Закрити</Button>
          <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Змінити пароль"}</Button>
        </div>
      </form>
        </div>
      )
}
