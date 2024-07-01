import React, { ChangeEventHandler, ReactEventHandler } from 'react'
import cl from './FileInput.module.css';

interface IFileInput {
    multiple:boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    accept?: string,
}

export const FileInput = ({multiple, onChange, accept}:IFileInput) => {
  return (
    <div className={cl.content}>
        <label htmlFor="fileInput"><span>Додати фотографії</span></label>
        <input type="file" id="fileInput" onChange={onChange} accept={accept} multiple={multiple} />
    </div>
  )
}
