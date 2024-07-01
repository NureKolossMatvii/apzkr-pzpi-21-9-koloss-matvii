import React, { useMemo, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../../components/UI/Button/Button'
import { CustomSelect, ISelect } from '../../../../../components/UI/CustomSelect/CustomSelect';
import { Input } from '../../../../../components/UI/Input/Input'
import formCl from '../../../../../styles/Form.module.css';
import { getCategoryFullName } from '../../../../utils/getCategoryFullName';
import { getSelectsCategoryItems } from '../../../../utils/SelectUtils/getSelectsItems';
import { createCategory, getCategoriesWithoutParent } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import cl from './CategoryCreateForm.module.css';
import { toast } from 'react-toastify';
import { Loader } from '../../../../components/UI/Loader/Loader';
import { LANGUAGE_ARRAY } from '../../../../consts';
import { getlanguagesValues } from '../../../../utils/getlanguagesValues';

export interface ICategoryCreateFormData {
    name:string,
    parentCategoryId:number,
}

export interface IForm {
  uaName: string,
  ruName: string,
  parentCategoryId:ISelect,
}

  interface IProps {
    fetchCategories: () => void,
    handleCloseCreateModal: () => void,
  }

export const CategoryCreateForm = ({fetchCategories, handleCloseCreateModal}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<IForm>();
    const [categories, setCategories] = useState<ICategory[]>([])
    const [mainLoading, setMainLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:IForm) => {
      setLoading(true);
      const formData:ICategoryCreateFormData = {
        parentCategoryId: +data.parentCategoryId?.value,
        name: getlanguagesValues(data, "Name"),
      }

      await createCategory(formData).then(() => {
        fetchCategories();
        toast.success("Категорія успішно створена");
        handleCloseCreateModal();
      }).catch(() => {
        toast.error("Невідома помилка")
      }).finally(() => setLoading(false))
    }

    const selectItems = useMemo<ISelect[]>(() => {
      return getSelectsCategoryItems(categories);
    }, [categories]);

    const fetchChildrenCategories = async () => {
      setMainLoading(true);
      await getCategoriesWithoutParent().then((data) => setCategories(data)).finally(() => setMainLoading(false));
    }

    useEffect(() => {
      fetchChildrenCategories();
    }, [])
  
    return (
      <div>
        {mainLoading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
          {LANGUAGE_ARRAY.map(({title}) => 
          <div className={formCl.item} key={title}>
          <Controller
            control={control}
            name={`${title.toLowerCase()}Name` as keyof IForm}
            rules={{
              required: "Введіть назву категорії",
              maxLength: {
                value: 20,
                message: 'Максимальна довжина категорії повинна бути не більше 20'
              },
              minLength: {
                value: 5,
                message: 'Мінімальна довжина не повинна бути менша за 5'
              },
            }}
            render={({ field }) => (
              <Input label={`Назва (${title})`} inputType="text" field={field}></Input>
            )}
          ></Controller>
          <p style={{ color: 'red' }}>{(errors as Record<string, any>)[`${title.toLowerCase()}Name`]?.message}</p>
        </div>
          )}
      <div className={formCl.item}>
          <CustomSelect name="parentCategoryId" control={control} label={"Батьківська категорія"} multiple={false} items={selectItems}/>
        <p style={{color: 'red'}}>{errors.parentCategoryId?.message}</p>
      </div>
      <div className={formCl.buttons}>
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Створити"}</Button>
      </div>
    </form>
      </div>
    )
}
