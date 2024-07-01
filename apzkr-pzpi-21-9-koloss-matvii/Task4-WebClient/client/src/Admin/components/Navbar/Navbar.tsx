import React, { ReactNode, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Context } from '../../..';
import { Button } from '../../../components/UI/Button/Button';
import { ADMIN_ROLE, MANAGER_ROLE } from '../../../consts';
import { ADMIN_CATEGORIES_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_SITES_ROUTE, ADMIN_USERS_ROUTE } from '../../Content/consts';
import cl from './Navbar.module.css';

interface IProps {
    children:ReactNode
}

interface ILink {
    path:string,
    name:string,
    roles: string[]
}

export const Navbar = (props:IProps) => {
    const contextValue = useContext(Context);
    const user = contextValue!.user;

    const signOut = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
    }

    const links:ILink[] = [
        {path: ADMIN_PRODUCTS_ROUTE, name: "Товари", roles: [ADMIN_ROLE, MANAGER_ROLE]},
        {path: ADMIN_CATEGORIES_ROUTE, name: "Категорії", roles: [ADMIN_ROLE, MANAGER_ROLE]},
        {path: ADMIN_USERS_ROUTE, name: "Аккаунти", roles: [ADMIN_ROLE]},
        {path: ADMIN_SITES_ROUTE, name: "Сайти", roles: [ADMIN_ROLE, MANAGER_ROLE]},
    ]

  return (
    <div className={cl.container}>
        <div className={cl.navbar}>
            <div className={cl.item}>
                <nav>
                    {links.map(({path, name, roles}) => roles.includes(user.user.role) && <ul key={path}><NavLink to={path}>{name}</NavLink></ul>)}
                </nav>
            </div>
            <div className={cl.item}>
                <Button type='button' onClick={signOut} variant={"secondary"}>Вийти</Button>
            </div>
        </div>
        <div className={cl.content}>
            {props.children}
        </div>
    </div>
  )
}