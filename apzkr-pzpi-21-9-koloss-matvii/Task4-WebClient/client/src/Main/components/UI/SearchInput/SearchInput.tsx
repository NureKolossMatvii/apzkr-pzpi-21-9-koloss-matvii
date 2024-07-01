import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import cl from './SearchInput.module.css';
import { useTranslation } from 'react-i18next';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    field?:ControllerRenderProps<T, TName>,
    placeholder?:string,
    disabled?: boolean,
    callback: () => void
}

export const SearchInput = <T extends FieldValues, TName extends Path<T>>(props:IProps<T, TName>) => {
  const {t} = useTranslation();

  return (
    <div className={cl.input}>
      <input type="search" placeholder={props.placeholder} disabled={props.disabled} {...props.field} ></input>
      <button onClick={props.callback}>{t("Find")}</button>
    </div>
  )
}