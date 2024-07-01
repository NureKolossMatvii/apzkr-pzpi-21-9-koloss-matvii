import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import cl from './Textarea.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    field:ControllerRenderProps<T, TName>,
    label?:string,
    height:number
}

export const Textarea = <T extends FieldValues, TName extends Path<T>>(props:IProps<T, TName>) => {
  return (
    <div className={cl.textarea}>
        <label>{props.label}</label>
        <textarea style={{height: props.height}} {...props.field}></textarea>
    </div>
  )
}
