import React from 'react'
import cl from './MenuSlider.module.css';

interface IProps {
  onDragStart?: () => void;
}

export const MenuSlider = (props:IProps) => {
  return (
    <div className={cl.content} onDragStart={() => props.onDragStart}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
