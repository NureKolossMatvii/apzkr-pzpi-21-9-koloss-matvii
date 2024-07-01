import React, { useEffect, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../../components/UI/Button/Button";
import { Input } from "../../../../../components/UI/Input/Input";
import cl from "./ProductCreateForm.module.css";
import formCl from "../../../../../styles/Form.module.css";
import { DragDropList, IItem } from "../../UI/DragDropList/DragDropList";
import { FileInput } from "../../UI/FileInput/FileInput";
import { Guid } from "guid-typescript";
import { Textarea } from "../../../../components/UI/Textarea/Textarea";
import { createProduct, generateArticle } from "../../../http/productApi";
import { getCategories } from "../../../http/categoryApi";
import { getCategoryFullName } from "../../../../utils/getCategoryFullName";
import { createImage } from "../../../http/imageApi";
import { getSites } from "../../../http/siteApi";
import { CheckBox } from "../../../../components/UI/Checkbox/CheckBox";
import {
  getSelectsCategoryItems,
  getSelectsSiteItems,
} from "../../../../utils/SelectUtils/getSelectsItems";
import { ISite } from "../../../pages/AdminSites";
import {
  CustomSelect,
  ISelect,
} from "../../../../../components/UI/CustomSelect/CustomSelect";
import { getFileListNode } from "../../../../utils/getFileListNode";
import { Loader } from "../../../../components/UI/Loader/Loader";
import { toast } from "react-toastify";
import { getChildrenCategories } from "../../../../utils/childrenCategory";
import { ICategory } from "../../../pages/AdminCategories";
import languages from "../../../../../trans/languages.json";
import { LANGUAGE_ARRAY } from "../../../../consts";
import { getlanguagesValues } from "../../../../utils/getlanguagesValues";

export interface IProductCreateFormData {
  id: string;
  name: string;
  published: boolean;
  description: string;
  purchasePrice: number;
  salePrice: number;
  trackNumber: string;
  location: string;
  instagramLink?: string,
  images: IImage[];
  article: string;
  categoryIdes: number[];
  siteIdes: number[];
  creationDate: string;
  editionDate: string;
}

interface IForm {
  id: string;
  uaName: string;
  ruName: string;
  published: boolean;
  uaDescription: string;
  ruDescription: string;
  purchasePrice: number;
  salePrice: number;
  instagramLink: string,
  trackNumber: string;
  location: string;
  images: IImage[];
  article: string;
  categoryIdes: ISelect[];
  siteIdes: ISelect[];
}

interface IImage {
  id: string;
  index: number;
}

interface IProps {
  fetchProducts: () => void;
  handleCloseCreateModal: () => void;
}

export interface FileInfo {
  id: number;
  file: File;
}

export const acceptedImageFiles = [".jpg", ".jpeg", ".png", ".webp"];

export const ProductCreateForm = ({
  fetchProducts,
  handleCloseCreateModal,
}: IProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [mainLoading, setMainLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sites, setSites] = useState<ISite[]>([]);

  const handleChangeList = (items: IItem[]) => {
    const updatedFiles = files.filter((file) =>
      items.some((item) => item.id === file.id)
    );
    const sortedFiles = [...updatedFiles].sort((a, b) => {
      const idA = items.findIndex((item) => item.id === a.id);
      const idB = items.findIndex((item) => item.id === b.id);

      return idA - idB;
    });

    setFiles(sortedFiles);
  };

  const addMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const additionalFiles = e.target.files;

    if (additionalFiles) {
      const maxId = files.reduce(
        (max, file) => (file.id > max ? file.id : max),
        0
      );
      const newFiles = Array.from(additionalFiles)
        .map((file, index) => ({
          id: maxId + index + 1,
          file: file,
        }))
        .filter((file) =>
          acceptedImageFiles.includes("." + file.file.type.split("/")[1])
        );

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      const sitesData = await fetchSites();
      setCategories(getChildrenCategories(categoriesData) as ICategory[]);
      setSites(sitesData);
    };

    setMainLoading(true);
    fetchData().finally(() => setMainLoading(false));
  }, []);

  const fetchCategories = async () => {
    return await getCategories();
  };

  const fetchSites = async () => {
    return await getSites();
  };

  const selectCategoryItems = useMemo<ISelect[]>(() => {
    return getSelectsCategoryItems(categories);
  }, [categories]);

  const selectSiteItems = useMemo<ISelect[]>(() => {
    return getSelectsSiteItems(sites);
  }, [sites]);

  const onSubmit = async (data: IForm) => {
    setLoading(true);
    const imageArray: IImage[] = files.map((value, index) => {
      return { id: Guid.create().toString(), index: index };
    });
    const dateNow = new Date();
    const formData: IProductCreateFormData = {
      ...data,
      description: getlanguagesValues(data, "Description"),
      name: getlanguagesValues(data, "Name"),
      categoryIdes: data.categoryIdes?.map(({ value }) => +value),
      siteIdes: data.siteIdes?.map(({ value }) => +value),
      id: Guid.create().toString(),
      article: await generateArticle(),
      images: imageArray,
      creationDate: dateNow.toUTCString(),
      editionDate: dateNow.toUTCString(),
    };

    await createProduct(formData)
      .then(() => {
        files.map(({ file }, index) => {
          const formData = new FormData();
          formData.append("file", file);
          createImage(imageArray[index].id, formData).then(() => {
            fetchProducts();
            handleCloseCreateModal();
          });
        });
        toast.success("Продукт успішно створенний");
      })
      .catch(() => {
        toast.error("Щось пішло не так, спробуйте ще раз");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {mainLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        {LANGUAGE_ARRAY.map(({title}) => 
         <div className={formCl.item} key={title}>
         <Controller
           control={control}
           name={`${title.toLowerCase()}Name` as keyof IForm}
           rules={{
             required: "Введіть назву продукту",
             maxLength: {
               value: 100,
               message:
                 "Максимальна довжина продукту повинна бути не більше 100",
             },
             minLength: {
               value: 5,
               message: "Мінімальна довжина не повинна бути менша за 5",
             },
           }}
           render={({ field }) => (
             <Input label={`Назва (${title})`} inputType="text" field={field}></Input>
           )}
         ></Controller>
         <p style={{ color: 'red' }}>{(errors as Record<string, any>)[`${title.toLowerCase()}Name`]?.message}</p>
       </div>
        )}
        {LANGUAGE_ARRAY.map(({title}) => 
        <div className={formCl.item} key={title}>
        <Controller
          control={control}
          name={`${title.toLowerCase()}Description` as keyof IForm}
          rules={{
            maxLength: {
              value: 2500,
              message:
                "Максимальна довжина опису повинна бути не більше 2000",
            },
          }}
          render={({ field }) => (
            <Textarea height={200} label={`Опис (${title})`} field={field}></Textarea>
          )}
        ></Controller>
        <p style={{ color: 'red' }}>{(errors as Record<string, any>)[`${title.toLowerCase()}Description`]?.message}</p>
      </div>
        )}
        <DragDropList
          items={getFileListNode(files)}
          setItems={handleChangeList}
        ></DragDropList>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"images"}
            rules={{
              validate: () =>
                files.length > 0 ? undefined : "Додайте хочаб одну фотографію",
            }}
            render={({ field }) => (
              <FileInput
                onChange={addMoreFiles}
                multiple={true}
                accept="image/*"
              ></FileInput>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.images?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"purchasePrice"}
            rules={{
              required: "Введіть ціну закупки",
              min: {
                value: 0,
                message: "Невірне число",
              },
            }}
            render={({ field }) => (
              <Input
                label={"Ціна закупки"}
                inputType="number"
                field={field}
              ></Input>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.purchasePrice?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"salePrice"}
            rules={{
              min: {
                value: 0,
                message: "Невірне число",
              },
            }}
            render={({ field }) => (
              <Input
                label={"Ціна продажу"}
                inputType="number"
                field={field}
              ></Input>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.salePrice?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"published"}
            render={({ field }) => (
              <CheckBox label={"Опублікувати?"} field={field}></CheckBox>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.published?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"trackNumber"}
            render={({ field }) => (
              <Input
                label={"Трек-номер"}
                inputType="text"
                field={field}
              ></Input>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.trackNumber?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"instagramLink"}
            render={({ field }) => (
              <Input
                label={"Instagram"}
                inputType="text"
                field={field}
              ></Input>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.instagramLink?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={"location"}
            render={({ field }) => (
              <Input
                label={"Місцезнаходження"}
                inputType="text"
                field={field}
              ></Input>
            )}
          ></Controller>
          <p style={{ color: "red" }}>{errors.location?.message}</p>
        </div>
        <div className={formCl.item}>
          <CustomSelect
            name="categoryIdes"
            control={control}
            label={"Категорії"}
            multiple={true}
            items={selectCategoryItems}
          />
          <p style={{ color: "red" }}>{errors.categoryIdes?.message}</p>
        </div>
        <div className={formCl.item}>
          <CustomSelect
            name="siteIdes"
            control={control}
            label={"Сайти"}
            multiple={true}
            items={selectSiteItems}
          />
          <p style={{ color: "red" }}>{errors.siteIdes?.message}</p>
        </div>
        <div className={formCl.buttons}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCloseCreateModal}
          >
            Закрити
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Завантаження..." : "Створити"}
          </Button>
        </div>
      </form>
    </div>
  );
};
