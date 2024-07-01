import React, { ReactNode } from 'react'
import { ICategory } from '../../pages/AdminCategories';
import { IProduct } from '../../pages/AdminProducts';
import cl from './TableWrapper.module.css';

interface IProps {
    children:ReactNode
}

export const TableWrapper = ({children}:IProps) => {
  return (
    <div className={cl.container}>
        {children}
    </div>
  )
}
