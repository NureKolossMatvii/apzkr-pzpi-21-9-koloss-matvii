import { FileInfo } from "../Content/components/Product/ProductCreate/ProductCreateForm";
import { IItem } from "../Content/components/UI/DragDropList/DragDropList";
import cl from '../styles/FileListNode.module.css';

export const getFileListNode = (fileList: FileInfo[]): IItem[] => {
  if (fileList) {
    const newPhotos: IItem[] = fileList.map((fileInfo) => ({
      id: fileInfo.id,
      content: (
        <div className={cl.listItem} key={fileInfo.id}>
          <div className={cl.image}>
            <img src={fileInfo.file && URL.createObjectURL(fileInfo.file)} alt={`Image ${fileInfo.id}`} />
          </div>
          <div className={cl.imageName}>
            <span>{fileInfo.file?.name}</span>
          </div>
        </div>
      ),
    }));

    return newPhotos;
  }
  return [];
};