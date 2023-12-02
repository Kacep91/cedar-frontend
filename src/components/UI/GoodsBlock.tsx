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
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
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
      const res = await axios.get("http://localhost:3000/goods");

      if (res.data) {
        dispatch(GoodsActions.setGoods(res.data));
        const categorizedProducts = Object.entries(
          categorizeProducts(res.data, selectedLabels),
        ).map((item) => ({
          label: item[0],
          items: item[1],
        })) as {
          label: string;
          items: ProductPresentationPageProps[];
        }[];
        dispatch(GoodsActions.setCategorizedData(categorizedProducts));
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

  useEffect(() => {
    if (!isLoading) {
      const target = window.location.hash?.replace("#", "");
      setTimeout(
        () =>
          document.getElementById(target)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        50,
      );
    }
  }, [window.location, isLoading]);

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
          {categorizedProducts && categorizedProducts.length > 0
            ? categorizedProducts.map(
                (
                  item: {
                    label: string;
                    items: ProductPresentationPageProps[];
                  },
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
                      <div
                        id={`product_id_${index}`}
                        style={{ marginBottom: "120px", visibility: "hidden" }}
                      >
                        O_o
                      </div>
                      <ItemListLabel>{item.label}</ItemListLabel>
                      <ItemListContainer>{allItems}</ItemListContainer>
                    </>
                  );
                },
              )
            : null}
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
