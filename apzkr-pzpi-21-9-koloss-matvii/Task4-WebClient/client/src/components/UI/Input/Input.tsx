import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import cl from './Input.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    field?:ControllerRenderProps<T, TName>,
    inputType:InputType,
    label?:string,
    disabled?: boolean,
}

type InputType = "password" | "text" | "number" | "date";

export const Input = <T extends FieldValues, TName extends Path<T>>(props:IProps<T, TName>) => {
  return (
    <div className={cl.input}>
      <label>{props.label}</label>
      <input type={props.inputType} disabled={props.disabled} {...props.field}></input>
    </div>
  )
}