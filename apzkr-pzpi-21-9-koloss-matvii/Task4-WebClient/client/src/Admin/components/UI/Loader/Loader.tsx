import React from 'react'
import cl from './Loader.module.css';

interface IProps {
    position?: PositionType,
    size?:number,
}

type PositionType = "fixed" | "absolute" | "static";

export const Loader = ({position = 'fixed', size = 80}:IProps) => {
    const loaderElements = Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{borderWidth: (size / 10), width: (size * 0.8), height: (size * 0.8)}}></div>
    ));

    return (
        <div className={cl.container} style={{position}}>
          <div className={cl.ldsRing} style={{width: size, height: size}}>
            {loaderElements}
         </div>
        </div>
       );
}
