import React, { useEffect, useState } from "react";
import { ProductCardType } from "./types";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import {
  ItemListContainer,
  ItemListWrapper,
  SortingHeader,
} from "components/atoms";
import { ItemListUnit } from "components/ItemListUnit";
import { ProgressSpinner } from "primereact/progressspinner";
import { arrayBufferToBase64, categorizeProducts } from "utils/utils";
import { GoodsActions, GoodsSelectors } from "store/goods";
import { useDispatch, useSelector } from "react-redux";
import { ProductPresentationPageProps } from "./ProductPresentationPage";

export const GoodsBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState("popularFirst");
  const dispatch = useDispatch();
  const goods = useSelector(GoodsSelectors.goodsList)

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

  const categories = [
    {
      key: "1-0",
      label: "Соки, сиропы, сбитни, пр. напитки",
      url: "/goods",
    },
    {
      key: "1-1",
      label: "Мёд натуральный и продукты пчеловодства",
      url: "/goods",
    },
    {
      key: "1-2",
      label: "Сибирское варенье из шишек и ягод",
      url: "/goods",
    },
    {
      key: "1-3",
      label: "Сушеная ягода, вяленая ягода",
      url: "/goods",
    },
    {
      key: "1-4",
      label: "Грибы (в т.ч. продукция из грибов)",
      url: "/goods",
    },
    {
      key: "1-5",
      label:
        "Десерты таежные (пралине, сгущеное молоко, урбеч, цукаты и т.д.), десерты из яблок (печенье и пр.)",
      url: "/goods",
    },
    {
      key: "1-6",
      label: "Иван-чай, травяные чаи/сборы",
      url: "/goods",
    },
    {
      key: "1-7",
      label: "Масла",
      url: "/goods",
    },
    {
      key: "1-8",
      label: "Косметическая продукция, эфирные масла",
      url: "/goods",
    },
    {
      key: "1-9",
      label: "Бады",
      url: "/goods",
    },
  ]

  // const bublik = goods.slice(0, 52).map(item => ({ ...item, image: null }))


  // const selectedLabels = [
  //   {
  //     label: "Соки, сиропы, сбитни, пр. напитки",
  //     match: ["сбитень", "сироп", "кофе"]
  //   },
  //   {
  //     label: "Мёд натуральный и продукты пчеловодства",
  //     match: ["десерт"]
  //   }, {
  //     label: "Сибирское варенье из шишек и ягод",
  //     match: ["варенье", "джем"]
  //   }, {
  //     label: "Сушеная ягода, вяленая ягода",
  //     match: ["вяленая", "сушеная"]
  //   }, {
  //     label: "Грибы (в т.ч. продукция из грибов)",
  //     match: ["гриб", "лисичка", "приправа", "суп"]
  //   }, {
  //     label: "Десерты таежные (пралине, сгущеное молоко, урбеч, цукаты и т.д.), десерты из яблок (печенье и пр.)",
  //     match: ["печенье", "цукаты", "урбеч", "пралине"]
  //   }, {
  //     label: "Иван-чай, травяные чаи/сборы",
  //     match: ["чай", "-чай"]
  //   }, {
  //     label: "Масла",
  //     match: ["пищевое масло"]
  //   }, {
  //     label: "Косметическая продукция, эфирные масла",
  //     match: ["эфирное масло"]
  //   }, {
  //     label: "Бады",
  //     match: ["спрей", "комплекс"]
  //   },
  // ];

  // const categorizedProducts = categorizeProducts(bublik, selectedLabels);

  // console.log(categorizedProducts)


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
          <ItemListContainer>
            {goods.map((item: ProductPresentationPageProps) => {
              return (
                <ItemListUnit
                  key={item.name}
                  {...item}
                  image={
                    item.image
                      ? arrayBufferToBase64(
                        item.image as unknown as {
                          type: string;
                          data: any[];
                        },
                      )
                      : ""
                  }
                />
              );
            })}
          </ItemListContainer>
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
