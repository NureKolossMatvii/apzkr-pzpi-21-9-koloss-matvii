import { Guid } from 'guid-typescript';
import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { CategoryCreateForm, ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { CategoryEditForm } from '../components/Category/CategoryEditForm/CategoryEditForm';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { getCategories } from '../http/categoryApi';
import tablePageClasses from '../styles/TablePage.module.css';
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { CategoryDeleteForm } from '../components/Category/CategoryDeleteForm/CategoryDeleteForm';
import { getCategoryFullName } from '../../utils/getCategoryFullName';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Input } from '../../../components/UI/Input/Input';
import filtrationCl from '../styles/Filtration.module.css';
import { Loader } from '../../components/UI/Loader/Loader';

export interface ICategory {
  id: number,
  name:string,
  parentCategoryId?:number,
  parentCategory?:ICategory,
}

interface IFiltration extends FieldValues{
  name: string
}

const headColumns:string[] = ["#", "Назва", "Контроллери"];

export const AdminCategories = () => {
  const { handleSubmit, control, setValue, getValues} = useForm<IFiltration>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editableCategory, setEditableCategory] = useState<ICategory>();
  const [deletableCategory, setDeletableCategory] = useState<ICategory>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (row:ICategory) => {
    setEditableCategory(row);
    setShowEditModal(true);
  }
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (row:ICategory) => {
    setDeletableCategory(row);
    setShowDeleteModal(true)
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  const onSubmit = async (data:IFiltration) => {
    const stringFiltration = categories.filter((category) => category.name.toLocaleLowerCase().includes(data.name.toLocaleLowerCase()));
    setFilteredCategories(stringFiltration)
  }

  const fetchCategories = async () => {
    setLoading(true);
    await getCategories().then((data) => {
      setCategories(data)
      setFilteredCategories(data);
    }).finally(() => setLoading(false));
  }

  return (
    <div className={tablePageClasses.container}>
      {loading && <Loader />}
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення категорії продукту"
      >
        <CategoryCreateForm fetchCategories={fetchCategories} handleCloseCreateModal={handleCloseCreateModal}></CategoryCreateForm>
      </Modal>
      <Modal
        onClose={handleCloseEditModal}
        show={showEditModal}
        title="Редагування категорії продукту"
      >
        <CategoryEditForm fetchCategories={fetchCategories} handleCloseEditModal={handleCloseEditModal} category={editableCategory}></CategoryEditForm>
      </Modal>
      <Modal
        onClose={handleCloseDeleteModal}
        show={showDeleteModal}
        title="Видалення категорії продукту"
      >
        <CategoryDeleteForm fetchCategories={fetchCategories} handleCloseDeleteModal={handleCloseDeleteModal} category={deletableCategory}></CategoryDeleteForm>
      </Modal>

      <div className={tablePageClasses.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={filtrationCl.item}>
          <Controller
          control={control}
          name={'name'}
          defaultValue={""}
          render={({ field }) => (
            <Input label={"Назва"} inputType="text" field={field}></Input>
          )}></Controller>
          </div>
          <div className={filtrationCl.item}>
        </div>
          <div className={filtrationCl.item}>
            <div className={filtrationCl.button}>
              <Button type="submit" variant="primary">Знайти</Button>
            </div>
          </div>
        </form>
      </div>

      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button" variant="primary">
            Створити
          </Button>
        </div>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                {headColumns?.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.id}</td>
                  <td>{getCategoryFullName(row)}</td>
                  <td>
                    <div className={tableWrapperCl.controlls}>
                      <div className={tableWrapperCl.button}><Button type="button" variant='warning' onClick={() => handleShowEditModal(row)}>Редагувати</Button></div>
                      <div className={tableWrapperCl.button}><Button type="button" variant='danger' onClick={() => handleShowDeleteModal(row)}>Видалити</Button></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </div>
    </div>
  )
}
