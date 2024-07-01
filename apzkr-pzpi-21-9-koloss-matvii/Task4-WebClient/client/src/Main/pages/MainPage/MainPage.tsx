import React, { useState, useEffect, useMemo } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { isJSDocNullableType } from "typescript";
import { Button } from "../../../components/UI/Button/Button";
import {
  CustomSelect,
  ISelect,
} from "../../../components/UI/CustomSelect/CustomSelect";
import { Pagination } from "../../../components/UI/Pagination/Pagination";
import { Categories } from "../../components/Categories/Categories";
import { Products } from "../../components/Products/Products";
import { getCategories } from "../../http/categoryApi";
import { getProducts } from "../../http/productApi";
import cl from "./MainPage.module.css";
import { Input } from "../../../components/UI/Input/Input";
import { MAIN_ROUTE, REACT_APP_API_URL } from "../../../consts";
import { Loader } from "../../../Admin/components/UI/Loader/Loader";
import { Helmet } from 'react-helmet-async';
import records from '../../../records.json';

export interface ICategory {
  id: number;
  name: string;
  paranentCategory?: ICategory;
  parentCategoryId?: number;
}

export interface ICategoryNormalize {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

export interface IProduct {
  id: string;
  instagramLink: string,
  name: string;
  article: string,
  description: string,
  images: IImage[],
  categories: ICategory[],
}

export interface IProductResponse {
  pageItems: IProduct[];
  itemsCount: number;
}

interface IImage {
  id: string;
  index: number;
}

export interface IProductsRequest {
  categoryIdes?: number[] | null;
  searchString: string;
  skip: number;
  take: number;
}

const takeItems = 48;

export const MainPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const normalizedCategories: ICategoryNormalize[] = useMemo(() => {
    const categoryMap: ICategoryNormalize[] = [];

    categories.forEach((category) => {
      const normalizedCategory: ICategoryNormalize = {
        id: category.id,
        name: category.name,
        childrenCategories: [],
      };

      if (!category.parentCategoryId) {
        categoryMap.push(normalizedCategory);
      } else {
        const parentCategoryIndex = categoryMap.findIndex(
          ({ id }) => id === category.parentCategoryId
        );
        if (parentCategoryIndex !== -1) {
          categoryMap[parentCategoryIndex].childrenCategories.push(
            normalizedCategory
          );
        }
      }
    });

    return categoryMap;
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    const category = queryParams.get("category");
    const pageNumber = queryParams.get("page");
    const searchString = queryParams.get("search");
    setCurrentPage(pageNumber ? +pageNumber : 1);

    const fetchData = async () => {
      await fetchProducts(category, pageNumber, searchString);
      await fetchCategories().then((data) => setCategories(data));
    };

    Promise.resolve(fetchData()).finally(() => setLoading(false));
  }, [location.search]);

  const fetchProducts = async (categoryId: string | null, page: string | null, searchString: string | null) => {
    const categoryIdes = categoryId !== null ? [+categoryId] : [];

    const request: IProductsRequest = {
      categoryIdes: categoryIdes,
      searchString: searchString ?? '',
      skip: takeItems * (+(page ?? 1) - 1),
      take: takeItems,
    };

    await getProducts(request).then((data) => {
      setProducts(data.pageItems);
      setPagesCount(Math.ceil(data.itemsCount / takeItems));
    });
  };

  const fetchCategories = async () => {
    return await getCategories();
  };

  const handlePageChange = async (number:number) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", number.toString())
    navigate(MAIN_ROUTE + `?${queryParams.toString()}`)
  }

  return (
    <>
    <Helmet>
      <title>{records.siteTitle}</title>
      <meta name="description" content={records.siteDescription} />
      <link rel="canonical" href={`http://antique-group.com`} />
    </Helmet>
    <div className={cl.wrapper}>
      {loading && <Loader />}
      <div className={cl.container}>
        <Categories items={normalizedCategories} />
        <div className={cl.productsContent}>
          <div className={cl.pagination}>
            <Pagination
              color={{ backgroundColor: "black", color: "white" }}
              setPage={handlePageChange}
              currentPage={currentPage}
              pagesCount={pagesCount}
            ></Pagination>
          </div>
          <Products products={products} />
          <div className={cl.pagination}>
            <Pagination
              color={{ backgroundColor: "black", color: "white" }}
              setPage={handlePageChange}
              currentPage={currentPage}
              pagesCount={pagesCount}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
