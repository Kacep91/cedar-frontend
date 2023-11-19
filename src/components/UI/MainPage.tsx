import React, { useEffect, useState } from "react";
import { ProductCardType } from "./types";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { ItemListContainer, ItemListWrapper, SortingHeader } from "components/atoms";
import { ItemListUnit } from "components/ItemListUnit";
import MainHeader from "./MainHeader";

export const MainPage = () => {

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3000/goods");

      if (res.data) {
        console.log(res.data)
        setGoods(res.data);
      }
    };

    fetch();
  }, []);

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

  const [sorting, setSorting] = useState("popularFirst");
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const [pageData, setPageData] = useState({
    first: 1,
    rows: 1,
    page: 1,
    pageCount: goods.length,
  });

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
      return ''
    }
    console.log('buffer', buffer)
    let binary = '';
    let bytes = new Uint8Array(buffer.data);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return binary;
  }

  return (
    <>
      <MainHeader isCart={false} />
      <SortingHeader>
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
            backgroundColor: "#008054",
            width: "240px",
            color: "white",
            outline: "none",
          }}
        />
      </SortingHeader>
      <ItemListWrapper>
        <ItemListContainer>
          {goods.map((item: ProductCardType) => {
            return <ItemListUnit key={item.name} {...item} image={item.image ? arrayBufferToBase64(item.image as unknown as { type: string; data: any[] }) : ''} />;
          })}
        </ItemListContainer>
        <Paginator
          first={pageData.first}
          rows={pageData.rows}
          totalRecords={goods.length}
          onPageChange={onPageChange}
        />
      </ItemListWrapper>
    </>
  );
};
