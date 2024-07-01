import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { createUser } from '../../../http/userApi';
import cl from './UserCreateForm.module.css'
import formCl from '../../../../../styles/Form.module.css';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';
import { toast } from 'react-toastify';

export interface IUserCreateFormData {
  login:string,
  password: string,
  confirmPassword: string,
}

interface IProps {
  fetchUsers: () => void
  handleCloseCreateModal: () => void,
}

export const UserCreateForm = ({fetchUsers, handleCloseCreateModal}:IProps) => {
  const { handleSubmit, control, formState: {errors}, getValues, setError, watch} = useForm<IUserCreateFormData>();
  const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:IUserCreateFormData) => {
      setLoading(true);
      await createUser(data).then(() => {
        fetchUsers();
        toast.success("Акаунт успішно створений")
        handleCloseCreateModal();
      }).catch(() => {
        toast.error("Щось пішло не так, спробуйте ще раз");
      }).finally(() => setLoading(false));
    } 
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'login'}
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
            <Input label={"Логін"} inputType="text" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.login?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'password'}
          rules={{
            required: "Введіть пароль",
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
            <Input label={"Пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.password?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'confirmPassword'}
          rules={{
            required: "Введіть пароль",
            maxLength: {
              value: 15,
              message: 'Максимальна довжина паролю повинна бути не більше 15'
            },
            minLength: {
              value: 6,
              message: 'Мінімальна довжина не повинна бути менша за 6'
            },
            validate: (value) => value === watch("password") || "Паролі не співпадають"
          }}
          render={({ field }) => (
            <Input label={"Підтвердіть пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.confirmPassword?.message}</p>
      </div>
      <div className={formCl.buttons}>
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Створити"}</Button>
      </div>
    </form>
      </div>
    )
}
