import React, { useEffect, useMemo, useState } from "react";
import { ProductCardType } from "./types";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import {
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  SortingHeader,
} from "components/atoms";
import { ItemListUnit } from "components/ItemListUnit";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  arrayBufferToBase64,
  categorizeProducts,
  selectedLabels,
} from "utils/utils";
import { GoodsActions, GoodsSelectors } from "store/goods";
import { useDispatch, useSelector } from "react-redux";
import { ProductPresentationPageProps } from "./ProductPresentationPage";

export const GoodsBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState("popularFirst");
  const dispatch = useDispatch();
  const goods = useSelector(GoodsSelectors.goodsList);

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [isMobileMenuOpened]);

  const [pageData, setPageData] = useState({
    first: 1,
    rows: 1,
    page: 1,
    pageCount: goods.length,
  });

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://185.70.185.67:3000/goods");

      if (res.data) {
        dispatch(GoodsActions.setGoods(res.data));
        setIsLoading(false);
      }
    };

    goods.length === 0 && fetch();
  }, [goods]);

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [isMobileMenuOpened]);

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setPageData({
      ...pageData,
      page: pageData.page + 1,
    });
  };

  const sortingOptions = [
    {
      label: "Сначала популярные",
      value: "popularFirst",
    },
    {
      label: "Сначала дешевые",
      value: "cheapFirst",
    },
    {
      label: "Сначала дорогие",
      value: "expensiveFirst",
    },
    {
      label: "По новизне",
      value: "newFirst",
    },
  ];

  const categorizedProducts = useMemo(
    () => categorizeProducts(goods, selectedLabels),
    [goods, selectedLabels],
  );

  const result = useMemo(
    () =>
      Object.entries(categorizedProducts).map((item) => ({
        label: item[0],
        items: item[1],
      })),
    [categorizedProducts],
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
          marginRight: "40px",
        }}
      >
        <Dropdown
          defaultValue={sorting}
          value={sorting}
          onChange={(e) => setSorting(e.value)}
          options={sortingOptions}
          optionLabel="label"
          className="sortingButton"
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "40px",
            backgroundColor: "#FFFFFF",
            width: "240px",
            color: "black",
            outline: "none",
          }}
        />
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "30vh",
          }}
        >
          <ProgressSpinner />
        </div>
      ) : (
        <ItemListWrapper>
          {result.map(
            (
              item: { label: string; items: ProductPresentationPageProps[] },
              index: number,
            ) => {
              const allItems = item.items.map((item2) => (
                <ItemListUnit
                  key={item2.name}
                  {...item2}
                  image={
                    item2.image
                      ? arrayBufferToBase64(
                          item2.image as unknown as {
                            type: string;
                            data: any[];
                          },
                        )
                      : ""
                  }
                />
              ));

              return (
                <>
                  <ItemListLabel id={`product_id_${index}`}>
                    {item.label}
                  </ItemListLabel>
                  <ItemListContainer>{allItems}</ItemListContainer>
                </>
              );
            },
          )}
          <Paginator
            first={pageData.first}
            rows={pageData.rows}
            totalRecords={goods.length}
            onPageChange={onPageChange}
          />
        </ItemListWrapper>
      )}
    </>
  );
};
