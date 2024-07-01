import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../../../components/UI/Button/Button";
import { Modal } from "../../../components/UI/Modal/Modal";
import { REACT_APP_API_URL } from "../../../consts";
import {
  IProductCreateFormData,
  ProductCreateForm,
} from "../components/Product/ProductCreate/ProductCreateForm";
import { TableWrapper } from "../components/TableWrapper/TableWrapper";
import { getProducts } from "../http/productApi";
import tablePageClasses from "../styles/TablePage.module.css";
import { ICategory } from "./AdminCategories";
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { Pagination } from "../../../components/UI/Pagination/Pagination";
import filtrationCl from '../styles/Filtration.module.css';
import { Input } from "../../../components/UI/Input/Input";
import { getCategories } from "../http/categoryApi";
import { getSites } from "../http/siteApi";
import { getSelectsCategoryItems, getSelectsSiteItems } from "../../utils/SelectUtils/getSelectsItems";
import { ISite } from "./AdminSites";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { CustomSelect, ISelect } from "../../../components/UI/CustomSelect/CustomSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_PRODUCTS_ROUTE } from "../consts";
import { ProductEditForm } from "../components/Product/ProductEditForm/ProductEditForm";
import { ProductDeleteForm } from "../components/Product/ProductDeleteForm/ProductDeleteForm";
import { Loader } from "../../components/UI/Loader/Loader";
import formatDateToYYYYMMDD from "../../../utils/formatDateToYYYYMMDD";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  article: string;
  published: boolean;
  isSaled: boolean,
  purchasePrice: number;
  salePrice: number;
  trackNumber: string;
  location:string,
  images:IImage[],
  sites: ISite[],
  categories: ICategory[],
}

interface IImage {
  id: string,
  index: number,
}

export interface IProductsRequest {
  minPurchasePrice:number,
  maxPurchasePrice:number,
  minSalePrice:number,
  maxSalePrice:number,
  categoryIdes:number[],
  siteIdes:number[],
  publishedFilter:PublishedFilterType,
  order:OrderField,
  orderType:OrderType,
  saledFilter: SaledFilterType,
  take:number,
  skip:number,
  searchString?:string,
  minEditionDate: string,
  maxEditionDate: string,
}

interface IFiltration extends FieldValues{
  minPurchasePrice:number,
  maxPurchasePrice:number,
  minSalePrice:number,
  maxSalePrice:number,
  categoryIdes:ISelect[],
  siteIdes:ISelect[],
  publishedFilter:ISelect,
  saledFilter:ISelect,
  orderField:ISelect,
  orderType:ISelect,
  searchString:string,
  minEditionDate: string,
  maxEditionDate: string,
}

type PublishedFilterType = "All" | "True" | "False";
type SaledFilterType = "All" | "True" | "False";
type OrderField = "Name" | "PurchasePrice" | "SalePrice";
type OrderType = "Ascending" | "Descending";

const headColumns: string[] = [
  "Картинка",
  "Назва",
  "Арт.",
  "Опублік.",
  "Продано",
  "Ціна закупки",
  "Ціна продажу",
  "+",
  "Трек номер",
  "Локація",
  "Сайти",
  "Контроллери",
];

const takeItems = 48;
const maxTextLength = 20;

export const AdminProducts = () => {
  const { control, setValue, getValues } = useForm<IFiltration>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableProduct, setEditableProduct] = useState<IProduct>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletableSite, setDeletableSite] = useState<IProduct>();
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sites, setSites] = useState<ISite[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [profit, setProfit] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleShowEditModal = (product:IProduct) => {
    setEditableProduct(product);
    setShowEditModal(true);
  }
  
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = (product:IProduct) => {
    setDeletableSite(product);
    setShowDeleteModal(true);
  }
  
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const fetchProducts = async () => {
    const categoryIdes = (getValues().categoryIdes ? getValues().categoryIdes?.map(({ value }) => +value) : []);
    const siteIdes = (getValues().siteIdes ? getValues().siteIdes.map(({ value }) => +value) : []);
    const publishedFilter:PublishedFilterType = (getValues().publishedFilter ? getValues().publishedFilter?.value : "All") as PublishedFilterType;
    const saledFilter:SaledFilterType = (getValues().saledFilter ? getValues().saledFilter?.value : "All") as SaledFilterType;
    const orderField:OrderField = (getValues().orderField ? getValues().orderField?.value : "Name") as OrderField;
    const orderType:OrderType = (getValues().orderType ? getValues().orderType?.value : "Ascending") as OrderType;

    const requestData: IProductsRequest = {
      ...getValues(),
      categoryIdes: categoryIdes,
      siteIdes: siteIdes, 
      publishedFilter: publishedFilter,
      saledFilter: saledFilter,
      order: orderField,
      orderType: orderType,
      take: takeItems,
      skip: (currentPage - 1) * takeItems,
    };

    try {
      await getProducts(requestData).then((data) => {
        setProducts(data.pageInfo.pageItems)
        setPagesCount(Math.ceil(data.pageInfo.itemsCount / takeItems));
        setProfit(data.profit);
      });
    } catch (error) {}
  };
 
  const fetchCategories = async () => {
    await getCategories().then((data) => setCategories(data)); 
  }

  const fetchSites = async () => {
    await getSites().then((data) => setSites(data));
  }

  const handlePageChange = async (number:number) => {
    navigate(ADMIN_PRODUCTS_ROUTE + `?page=${number}`)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageNumber = queryParams.get('page');
    setCurrentPage(pageNumber ? +pageNumber : 1);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCategories(), fetchSites()]).finally(() => setLoading(false));
  }, [])
  
  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, [currentPage])

const selectCategoryItems = useMemo<ISelect[]>(() => {
  return getSelectsCategoryItems(categories);
}, [categories]);
 
const selectSiteItems = useMemo<ISelect[]>(() => {
  return getSelectsSiteItems(sites);
}, [sites]);

const selectPublishedItems = [
  {value: "True", label: "Опубліковано"},
  {value: "False", label: "Не опубліковано"},
]

const selectSaledItems = [
  {value: "True", label: "Продано"},
  {value: "False", label: "Не продано"},
]

const selectOrderFieldItems = [
  {value: "CreationDate", label: "Сортувати за датою створення"},
  {value: "EditionDate", label: "Сортувати за датою редагування"},
  {value: "PurchasePrice", label: "Сортувати за ціною покупки"},
  {value: "SalePrice", label: "Сортувати за ціною продажу"},
  {value: "Name", label: "Сортувати за назвою"},
]

const selectOrderTypeItems = [
  {value: "Ascending", label: "За збільшенням"},
  {value: "Descending", label: "За зменшенням"},
]

const onSubmit = async () => {
  fetchProducts()
}

const getNextDay = () => {
  const dateNow = new Date();
  return new Date(dateNow.setDate(dateNow.getDate() + 1));
};

  return (
    <div className={tablePageClasses.container}>
      {loading && <Loader></Loader>}
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення продукту"
      >
        <ProductCreateForm fetchProducts={fetchProducts} handleCloseCreateModal={handleCloseCreateModal}></ProductCreateForm>
      </Modal>
      <Modal
        onClose={handleCloseEditModal}
        show={showEditModal}
        title="Редагування продукту"
      >
        <ProductEditForm fetchProducts={fetchProducts} handleCloseEditModal={handleCloseEditModal} product={editableProduct}></ProductEditForm>
      </Modal>
      <Modal
        onClose={handleCloseDeleteModal}
        show={showDeleteModal}
        title="Видалення продукту"
      >
        <ProductDeleteForm fetchProducts={fetchProducts} handleCloseDeleteModal={handleCloseDeleteModal} product={deletableSite}></ProductDeleteForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'minPurchasePrice'}
        defaultValue={0}
        render={({ field }) => (
          <Input label={"Ціна закупки (від)"} inputType="number" field={field}></Input>
        )}></Controller>
          <Controller
        control={control}
        name={'maxPurchasePrice'}
        defaultValue={1000000}
        render={({ field }) => (
          <Input label={"Ціна закупки (до)"} inputType="number" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'minSalePrice'}
        defaultValue={0}
        render={({ field }) => (
          <Input label={"Ціна продажу (від)"} inputType="number" field={field}></Input>
        )}></Controller>
        <Controller
        control={control}
        name={'maxSalePrice'}
        defaultValue={1000000}
        render={({ field }) => (
          <Input label={"Ціна продажу (до)"} inputType="number" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'minEditionDate'}
        defaultValue={"0001-01-01"}
        render={({ field }) => (
          <Input label={"Дата (від)"} inputType="date" field={field}></Input>
        )}></Controller>
        <Controller
        control={control}
        name={'maxEditionDate'}
        defaultValue={formatDateToYYYYMMDD(getNextDay())}
        render={({ field }) => (
          <Input label={"Дата (до)"} inputType="date" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
          <CustomSelect name="categoryIdes" control={control} label={"Категорії"} multiple={true} isClearable={true} setValue={setValue} items={selectCategoryItems}/>
          <CustomSelect name="siteIdes" control={control} label={"Сайти"} multiple={true} isClearable={true} setValue={setValue} items={selectSiteItems}/>
        </div>
        <div className={filtrationCl.item}>
          <CustomSelect name="publishedFilter" control={control} label={"Статус публікації"} setValue={setValue} items={selectPublishedItems} isClearable={true}/>
          <CustomSelect name="saledFilter" control={control} label={"Статус продажу"} setValue={setValue} items={selectSaledItems} isClearable={true}/>
          <CustomSelect name="orderField" control={control} label={"Сортування за"} setValue={setValue} items={selectOrderFieldItems} value={getValues().orderField || selectOrderFieldItems[0]} />
          <CustomSelect name="orderType" control={control} label={"Тип сортування"} setValue={setValue} items={selectOrderTypeItems} value={getValues().orderType || selectOrderTypeItems[0]} />
        </div>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'searchString'}
        defaultValue={""}
        render={({ field }) => (
          <Input label={"Назва"} inputType="text" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
          <div className={filtrationCl.button}>
            <Button type="button" variant="primary" onClick={onSubmit}>Знайти</Button>
          </div>
        </div>
      </div>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.info}>
          <div className={tablePageClasses.createButton}>
            <Button onClick={handleShowCreateModal} type="button" variant='primary'>
              Створити
            </Button>
          </div>
          <div className={tablePageClasses.total}><h4>Total: {profit}</h4></div>
        </div>
        {products.length === 0 ? <div>Нічого не знайдено</div> :
        <>
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={handlePageChange} color={{backgroundColor: "rgb(124, 181, 255)", color: "white"}}></Pagination>
        </div>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                {headColumns?.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {products?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <div className={tableWrapperCl.image}>
                    <img src={`${REACT_APP_API_URL}api/Image/${(row.images.find((image) => image.index === 0))?.id}`} alt="" />
                  </div>
                </td>
                <td>{row.name.length > maxTextLength ? row.name.substring(0, maxTextLength) + "..." : row.name}</td>
                <td>{row.article}</td>
                <td>{row.published ? "Так" : "Ні"}</td>
                <td>{row.isSaled ? "Так" : "Ні"}</td>
                <td>{row.purchasePrice}</td>
                <td>{row.salePrice}</td>
                <td>{row.salePrice - row.purchasePrice}</td>
                <td>{row.trackNumber.length > maxTextLength ? row.trackNumber.substring(0, maxTextLength) + "..." : row.trackNumber}</td>
                <td>{row.location}</td>
                <td>{row.sites.map((site) => site.name).join(", ")}</td>
                <td>
                    <div className={[tableWrapperCl.controlls, tableWrapperCl.flDirCol].join(' ')}>
                      <div className={tableWrapperCl.button}><Button type="button" variant='warning' onClick={() => handleShowEditModal(row)}>Редагувати</Button></div>
                      <div className={tableWrapperCl.button}><Button type="button" variant='danger' onClick={() => handleShowDeleteModal(row)}>Видалити</Button></div>
                    </div>
                  </td>
              </tr>
            ))}
            </tbody>
          </table>
        </TableWrapper>
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={handlePageChange} color={{backgroundColor: "rgb(124, 181, 255)", color: "white"}}></Pagination>
        </div>
        </>
        }
      </div>
    </div>
  );
};
