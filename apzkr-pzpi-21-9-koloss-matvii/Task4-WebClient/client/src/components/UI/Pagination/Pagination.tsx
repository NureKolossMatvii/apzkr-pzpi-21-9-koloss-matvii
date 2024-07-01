import React from 'react'
import cl from './Pagination.module.css';

interface IProps {
    pagesCount:number,
    currentPage:number,
    setPage: (pageNumber:number) => void,
    color: IColor,
}

interface IColor {
    backgroundColor: string,
    color: string
}

const viewItemsNumber = 2;

export const Pagination = ({pagesCount, currentPage, setPage, color}:IProps) => {   
    const pageNumbers = Array.from({ length: pagesCount }, (_, index) => index + 1);

    let displayedPages: number[] = [];

    if (pagesCount > viewItemsNumber * 2) {
        const firstPages = pageNumbers.slice(0, viewItemsNumber);
        const lastPages = pageNumbers.slice(-viewItemsNumber);
        const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
            (page) => page > viewItemsNumber && page < pagesCount - viewItemsNumber + 1
        );

        displayedPages = [...firstPages, ...middlePages, ...lastPages];
    } else {
        displayedPages = pageNumbers;
    }

    if (pagesCount <= 1) {
        return null;
    }

    return (
        <div className={cl.content}>
            <div className={cl.items}>
                {displayedPages.map((number, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && number - displayedPages[index - 1] > 1 && <div className={cl.item}>...</div>}
                        <div className={cl.item} style={(currentPage === number) ? color : undefined} onClick={() => setPage(number)}>{number}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
