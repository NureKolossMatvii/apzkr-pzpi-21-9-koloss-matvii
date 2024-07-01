import React, { ReactNode, useState, useEffect } from 'react'
import { CloseButton } from '../../../../../components/UI/CloseButton/CloseButton';
import cl from './DragDropList.module.css';
import { MenuSlider } from '../MenuSlider/MenuSlider';

export interface IItem {
    id:number,
    content:JSX.Element
}

interface IProps {
    items:IItem[],
    setItems: (newItems:IItem[]) => void,
}

export const DragDropList = ({items, setItems}:IProps) => {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        e.dataTransfer.setData('text/plain', id.toString());
      };
    
      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      };
    
      const handleDrop = (e: React.DragEvent<HTMLDivElement>, newIndex: number) => {
        e.preventDefault();
    
        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
        const newItems = [...items];
        const draggedItem = newItems.find((item) => item.id === draggedItemId);
    
        if (draggedItem) {
          newItems.splice(items.indexOf(draggedItem), 1);
          newItems.splice(newIndex, 0, draggedItem);
    
          setItems(newItems);
        }
      };

      const handleDelete = (index:number) => {
        setItems([...items.filter((item) => item.id !== index)])
      }

  return (
    <div className={cl.container}>
        <div className={cl.items} onDragOver={handleDragOver}>
            {items.map((item, index) => 
                <div
                key={item.id}
                className={cl.item}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, index)}
                >
                    {items.length > 1 && <div className={cl.slider}><MenuSlider></MenuSlider></div>}
                    <div className={cl.itemContent}>
                        <div className={cl.children}>{item.content}</div>
                        <div className={cl.closeButton}><CloseButton size={15} onClick={() => handleDelete(item.id)}></CloseButton></div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}