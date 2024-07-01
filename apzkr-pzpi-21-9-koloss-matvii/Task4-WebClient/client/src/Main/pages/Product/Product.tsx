import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../Admin/components/UI/Loader/Loader";
import { MAIN_ROUTE, NO_ROUTE, REACT_APP_API_URL } from "../../../consts";
import { ImageSlider } from "../../components/UI/ImageSlider/ImageSlider";
import { getProduct } from "../../http/productApi";
import { IProduct } from "../MainPage/MainPage";
import cl from "./Product.module.css";
import { useTranslation } from "react-i18next";
import { Context } from "../../..";
import { Helmet } from "react-helmet-async";
import { PRODUCT_ROUTE } from "../../consts";
import records from '../../../records.json';
import { toast } from "react-toastify";

export const Product = () => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const contextValue = useContext(Context);
  const [language] = contextValue!.language;

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const imageArray: string[] = useMemo(() => {
    if (product) {
      const images = product.images;
      return images
        .sort((a, b) => a.index - b.index)
        .map(({ id }) => `${REACT_APP_API_URL}api/image/${id}`);
    }

    return [];
  }, [product]);

  const fetchProduct = async () => {
    setLoading(true);
    if (params.id) {
      await getProduct(params.id)
        .then((data) => setProduct(data))
        .catch(({response}) => {
          switch (response.status) {
            case records.statusCodes.notFound:
                navigate(NO_ROUTE);
              break;
            default:
              toast.error("Щось пішло не так, спробуйте ще раз");
              break;
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const getDescription = (description?: string): ReactNode => {
    if (description) {
      const descriptionWithBreaks = description
        .split(/\n/g)
        .map((line, index) => (
          <>
            {line !== "" && <p>{line}</p>}
            <br />
          </>
        ));

      return descriptionWithBreaks;
    }

    return;
  };

  return (
    <>
      <Helmet>
        <title>{product && JSON.parse(product.name)[language]}</title>
        <meta
          name="description"
          content={product && JSON.parse(product.name)[language]}
        />
        <meta property="og:image" content={imageArray[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product?.name} />
      </Helmet>
      <div className={cl.wrapper}>
        {loading && <Loader />}
        <div className={cl.container}>
          <div className={cl.content}>
            <div className={cl.title}>
              <h1>
                {product?.article}.{" "}
                {product && JSON.parse(product.name)[language]}
              </h1>
            </div>
            <div className={cl.image}>
              <ImageSlider imagesUrls={imageArray} />
            </div>
          </div>
          <div className={cl.content}>
            <div className={cl.info}>
              <div className={cl.infoTitle}>
                <h2>{t("Description")}</h2>
              </div>
              <div className={cl.infoContent}>
                <h4>
                  {product &&
                    getDescription(JSON.parse(product.description)[language])}
                </h4>
              </div>
            </div>
            <div className={cl.info}>
              {product?.instagramLink &&
              <div className={cl.infoContent}>
              <div className={cl.contacts}>
                <a
                  href={product.instagramLink}
                  className={cl.contactItem}
                  aria-label={t("View this product on our Instagram profile")}
                  target="_blank"
                >
                  <div className={cl.contactIcon}>
                    <img
                      src={`/assets/images/instagram_icon.png`}
                      alt={t("Icon")}
                    />
                  </div>
                  <div className={cl.contactLink}>
                    {t("This product is on Instagram")}
                  </div>
                </a>
              </div>
            </div>
              }
              <div className={cl.infoContent}>
                <div className={cl.tiles} aria-label={t("Categories")}>
                  {product?.categories.map((category) => (
                    <NavLink
                      aria-label={`${t("Find products with a category")} ${
                        JSON.parse(category.name)[language]
                      }`}
                      to={MAIN_ROUTE + `?category=${category.id}`}
                      key={category.id}
                    >
                      <div className={cl.tile}>
                        {JSON.parse(category.name)[language]}
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
