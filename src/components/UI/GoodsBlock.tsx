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

export const GoodsBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [goods, setGoods] = useState([]);
  const [sorting, setSorting] = useState("popularFirst");

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
        setGoods(res.data);
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

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

  function arrayBufferToBase64(buffer: { type: string; data: any[] }) {
    if (!buffer) {
      return "";
    }
    let binary = "";
    let bytes = new Uint8Array(buffer.data);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return binary;
  }

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
            {goods.map((item: ProductCardType) => {
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
