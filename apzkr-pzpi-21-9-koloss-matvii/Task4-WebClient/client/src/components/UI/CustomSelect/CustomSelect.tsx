import React, {useEffect} from 'react'
import { Control, Controller, ControllerRenderProps, FieldPath, FieldPathValue, FieldValues, KeepStateOptions, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import { DARK_GRAY_COLOR, GRAY_COLOR, MAIN_COLOR, RED_COLOR, } from '../../../Admin/consts'
import cl from './CustomSelect.module.css';

export interface ISelect {
    value: string,
    label: string
}

interface IProps <T extends FieldValues, TName extends Path<T>> {
    multiple?: boolean;
    items: ISelect[];
    label: string,
    control:Control<T, any>,
    name: Path<T>,
    value?: FieldPathValue<T, TName>,
    setValue?: UseFormSetValue<T>,
    isClearable?: boolean,
  }

  const customStyles = {
    control: (baseStyles:any, {isFocused}:any) => ({
        ...baseStyles,
        border: `1px solid ${DARK_GRAY_COLOR}`,
        ':hover': {
            border: `1px solid ${DARK_GRAY_COLOR}`,
        },
        boxShadow: isFocused && 'none',
        width: '100%'
    }),
    option: (styles:any, {isFocused, isSelected}:any) => ({
        ...styles,
        background: isFocused ? GRAY_COLOR : isSelected ? MAIN_COLOR : 'white',
        color: 'black'
    }),
    multiValueRemove: (styles:any, {data}:any) => ({
        ...styles,
        ':hover': {
            background: RED_COLOR,
        },
    }) 
}

export const CustomSelect = <T extends FieldValues, TName extends Path<T>>({value, setValue, name, control, multiple = false, items, label, isClearable = false}:IProps<T, TName>) => {

    useEffect(() => {
        if (setValue && value) {
            setValue(name, value);
          }
    }, [items])

  return (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <div className={cl.content}>
            <label>{label}</label>
            <Select
                className={cl.select}
                options={items as PathValue<T, TName>}
                isMulti={multiple}
                styles={customStyles}
                noOptionsMessage={() => "Нічого не знайдено"}
                closeMenuOnSelect={!multiple}
                isClearable={isClearable}
                hideSelectedOptions={false}
                {...field}
            ></Select>
            </div>
        )}></Controller>
  )
}
