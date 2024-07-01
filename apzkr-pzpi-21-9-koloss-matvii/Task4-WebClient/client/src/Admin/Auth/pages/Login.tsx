import React, {useContext} from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Context } from '../../..';
import { Button } from '../../../components/UI/Button/Button';
import { Input } from '../../../components/UI/Input/Input';
import mapJwtClaims from '../../../utils/mapJwtClaims';
import { login } from '../http/authApi';
import cl from '../styles/Login.module.css';
import formCl from '../../../styles/Form.module.css';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PRODUCTS_ROUTE } from '../../Content/consts';

export interface LoginFormData {
    login: string;
    password: string;
}

export const Login = () => {
  const contextValue = useContext(Context);
  const navigate = useNavigate();
  const user = contextValue!.user;
    const { handleSubmit, control, formState: {errors}, getValues, setError } = useForm<LoginFormData>()
    const onSubmit = async (data: LoginFormData) => {
      await login(data).then((data) => {
        user.setIsAuth(true);
        user.setUser(mapJwtClaims(data));
        navigate(ADMIN_PRODUCTS_ROUTE);
      }).catch(() => setError("password", {type: 'validate', message: "Невірний логін або пароль"}));
    }

  return (
    <div className={cl.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        <h1>Вхід</h1>
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
          <Input label={'Пароль'} inputType="password" field={field}></Input>
        )}
      ></Controller>
      <p style={{color: 'red'}}>{errors.password?.message}</p>
    </div>
    <div className={formCl.buttons}>
      <Button type="submit" variant='primary'>Увійти</Button>
    </div>
  </form>
    </div>
  )
}
