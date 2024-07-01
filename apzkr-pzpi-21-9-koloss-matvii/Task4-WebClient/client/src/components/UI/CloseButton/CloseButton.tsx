import React from 'react'
import cl from './CloseButton.module.css';

interface IProps {
    size:number,
    onClick:() => void,
}

export const CloseButton = ({onClick, size}:IProps) => {
  return (
    <button onClick={onClick} style={{width: size, height: size}} className={cl.button}></button>
  )
}
