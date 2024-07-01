import React, { useState } from "react";
import cl from "./ImageSlider.module.css";
import { isMobile } from "react-device-detect";
import { useSwipeable } from "react-swipeable";
import { useTranslation } from "react-i18next";

interface IProps {
  imagesUrls: string[];
}

export const ImageSlider = ({ imagesUrls }: IProps) => {
  const [selected, setSelected] = useState<number>(0);
  const handlers = useSwipeable({
    onSwiped: (eventData) => swipeImage(eventData.dir),
    trackMouse: false,
    trackTouch: true,
  });
  const {t} = useTranslation();

  const selectImage = (index: number) => {
    setSelected(index);
  };

  const swipeImage = (dir: string) => {
    if (dir === "Right") {
      handleChangeImage(-1);
    } else {
      handleChangeImage(1);
    }
  };

  const handleChangeImage = (num: number) => {
    const newIndex = selected + num;
    const lastIndex = imagesUrls.length - 1;

    if (newIndex > lastIndex) {
      setSelected(0);
    } else if (newIndex < 0) {
      setSelected(lastIndex);
    } else {
      setSelected(newIndex);
    }
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        {!isMobile ? (
          <>
            <button
              aria-label={t("Back")}
              className={[cl.button, cl.prev].join(" ")}
              onClick={() => handleChangeImage(-1)}
            ></button>
            <button
              aria-label={t("Next")}
              className={[cl.button, cl.next].join(" ")}
              onClick={() => handleChangeImage(1)}
            ></button>
          </>
        ) : (
          <div className={cl.dots}>
            {imagesUrls.map((url, index) => (
              <div
                key={url}
                className={[cl.dot, selected === index && cl.active].join(
                  " "
                )}
              ></div>
            ))}
          </div>
        )}
        <div
          {...handlers}
          className={cl.sliderWrapper}
          style={{ transform: `translate3d(${selected * -100}%, 0px, 0px)` }}
        >
          {imagesUrls.map((url) => (
            <div className={cl.slide} key={url}>
              <img src={url} alt={t("Product image")} loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>
      {!isMobile && (
        <div className={cl.items}>
          {imagesUrls.map((url, index) => (
            <div
              key={url}
              className={[cl.item, selected === index && cl.active].join(" ")}
              onMouseEnter={!isMobile ? () => selectImage(index) : undefined}
              onClick={isMobile ? () => selectImage(index) : undefined}
            >
              <img src={url} alt={t("Product image")} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
