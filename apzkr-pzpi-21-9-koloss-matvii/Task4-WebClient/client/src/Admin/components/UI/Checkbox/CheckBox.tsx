import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import cl from './Checkbox.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    field?:ControllerRenderProps<T, TName>,
    label?:string,
}

export const CheckBox = <T extends FieldValues, TName extends Path<T>>({label, field}:IProps<T, TName>) => {
  return (
    <>
    <label className={cl.container}>{label}
        <input type="checkbox" checked={field?.value} {...field}/>
        <span className={cl.checkmark}></span>
    </label> 
    </>
  )
}
