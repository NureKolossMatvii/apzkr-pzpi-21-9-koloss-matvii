import React, { ReactNode } from 'react'
import { CloseButton } from '../CloseButton/CloseButton';
import cl from './Modal.module.css';

interface IProps {
    children: ReactNode,
    show:boolean,
    onClose:() => void,
    title:string
}

export const Modal = ({show, children, onClose, title}:IProps) => {
  return (
    <>
        {show &&
            <div className={cl.container} onClick={onClose}>
                <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={cl.content}>
                        <div className={cl.header}>
                            <div className={cl.title}><h2>{title}</h2></div>
                            <div className={cl.closeButton}><CloseButton size={25} onClick={onClose}></CloseButton></div>
                        </div>
                        <div className={cl.body}>{children}</div>
                    </div>
                </div>
        </div>
        }
    </>
  )
}
