import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

import styled from "styled-components";
import { Heading } from "ui/Typography";
import { Checkbox } from "ui/Checkbox";
import axios from "axios";
import MainHeader from "./UI/MainHeader";
import { BackLinkAtom } from "./UI/BackLink";
import { AdminControlWrapper, ButtonFacade } from "./atoms";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import { categorizeProducts, selectedLabels } from "utils/utils";
import { ProductPresentationPageProps } from "./UI/ProductPresentationPage";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useScreenSize } from "utils/hooks";
import ScrollToTopOnMount from "utils/scrollRestorationFix";

const Row = styled.div`
  margin: 15px 0 10px 0;
  width: 100%;

  input {
    width: 100%;
  }
`;

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 100%;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 0 0 17vh 0;
`;

const FileUploadWrapper = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  max-width: 600px;
  width: 100%;

  @media screen and (max-width: 460px) {
    max-width: 400px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  @media screen and (max-width: 460px) {
    max-width: 400px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 12px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  max-width: 570px;
  width: 100%;

  @media screen and (max-width: 460px) {
    max-width: 400px;
  }
`;

const buttons = [
  { text: "Загрузить продукты", content: "loadGoods" },

  { text: "Удалить продукты", content: "removeGoods" },

  { text: "Загрузить рецепты", content: "loadRecipes" },

  { text: "Удалить рецепты", content: "removeRecipes" },

  { text: "Загрузить фото для слайдера", content: "loadSlider" },

  { text: "Удалить фото для слайдера", content: "removeSlider" },
];

export const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const goods = useSelector(GoodsSelectors.goodsList);
  const recipes = useSelector(GoodsSelectors.recipesList);
  const slides = useSelector(GoodsSelectors.slidesList);

  const [isDeleteModalOpened, setDeleteModalOpen] = useState(false);
  const [isDeleteModalRecipeOpened, setDeleteModalRecipeOpen] = useState(false);
  const [isDeleteModalSlideOpened, setDeleteModalSlideOpen] = useState(false);

  const [itemForDelete, setItemForDelete] = useState<{
    id: string | null;
    name: string;
  }>({ id: null, name: "" });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [onlyImages, setOnlyImages] = useState(false);
  const isMobile = useScreenSize("mobile");

  const deleteItem = (item: { id: string | null; name: string }) => {
    if (!item) {
      return;
    }

    return axios.delete(`http://localhost:3000/goods/${item.id}`).then(() => {
      setDeleteModalOpen(false);
      toast.current?.show({
        severity: "info",
        summary: "Успех",
        detail: "Данные успешно удалены",
      });
    });
  };

  const deleteItemRecipe = (item: { id: string | null; name: string }) => {
    if (!item) {
      return;
    }

    return axios.delete(`http://localhost:3000/recipes/${item.id}`).then(() => {
      setDeleteModalRecipeOpen(false);
      toast.current?.show({
        severity: "info",
        summary: "Успех",
        detail: "Данные успешно удалены",
      });
    });
  };

  const deleteItemSlide = (item: { id: string | null; name: string }) => {
    if (!item) {
      return;
    }

    return axios.delete(`http://localhost:3000/slides/${item.id}`).then(() => {
      setDeleteModalSlideOpen(false);
      toast.current?.show({
        severity: "info",
        summary: "Успех",
        detail: "Данные успешно удалены",
      });
    });
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    if (typeof e === "string") {
      const value = e?.trim();
      let _filters = { ...filters };

      // @ts-ignore
      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    } else {
      const value = e.target.value?.trim();
      let _filters = { ...filters };

      // @ts-ignore
      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    }
  };

  const renderHeader = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            style={{ width: "150%" }}
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Поиск продукта по ID или имени"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-times"
          style={{ marginLeft: "160px" }}
          className="p-button-outlined p-button-rounded p-button-danger"
          onClick={() => onGlobalFilterChange("")}
        />
      </div>
    );
  };

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
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
        setIsLoading(false);
      }
    };

    recipes.length === 0 && fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/slides");

      if (res.data) {
        dispatch(GoodsActions.setSlides(res.data));
        setIsLoading(false);
      }
    };

    slides.length === 0 && fetch();
  }, []);

  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState("loadGoods");
  const [recipiesFormData, setRecipiesFormData] = useState({
    id: "",
    name: "",
    ingridients: "",
    instructions: "",
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    weight: "",
    price: "",
    oldPrice: "",
    volume: "",
    dueDate: "",
    package: "",
    minRequest: "",
    description: "",
    ingridients: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRecipe = (name: string, value: any) => {
    setRecipiesFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateSelect = (e: FileUploadUploadEvent) => {
    let _totalSize = totalSize;
    let files = e.files;

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setFiles(e.files);
    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({
      severity: "info",
      summary: "Успех",
      detail: "Данные успешно загружены",
    });
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 50000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 Б";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 50 МБ</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file?.objectURL}
            width={100}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
              marginLeft: "10px",
            }}
          >
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined hidden",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // async function blobToBuffer(blob: Blob): Promise<{ type: string; data: number[]; }> {
  //   const arrayBuffer = await blob.arrayBuffer();
  //   const data = Array.from(new Uint8Array(arrayBuffer));
  //   return { type: "Buffer", data: data };
  // }

  // function randomDate(start, end) {
  //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  // }

  const handleSubmitRecipe = () => {
    axios
      .get<File>(files[0]?.objectURL, { responseType: "blob" })
      .then(async (res) => {
        const result = new FormData();
        const textedBlob = await blobToBase64(res.data);

        result.append("id", uuidv4());
        result.append("name", recipiesFormData.name);
        result.append("ingridients", recipiesFormData.ingridients);
        result.append("instructions", recipiesFormData.instructions);
        result.append("name", recipiesFormData.name);
        result.append("image", textedBlob);

        let object = {};
        result.forEach((value, key) => {
          object[key] = value;
        });

        console.log("object", object);

        axios
          .post("http://localhost:3000/recipes", object)
          .then((response) => {
            console.log(response.data);
            toast.current?.show({
              severity: "info",
              summary: "Успех",
              detail: "Данные успешно загружены",
            });
          })
          .catch((error) => {
            console.error(error);
            toast.current?.show({
              severity: "error",
              summary: "Неудача",
              detail: "Во время загрузки произошла ошибка",
            });
          });
      });
  };

  const handleSlidesSubmit = async () => {
    for (const item of files) {
      try {
        const res = await axios.get<File>(item?.objectURL, {
          responseType: "blob",
        });
        const result = new FormData();
        const textedBlob = await blobToBase64(res.data);

        result.append("id", uuidv4());
        result.append("image", textedBlob);

        let object = {};
        result.forEach((value, key) => {
          object[key] = value;
        });

        console.log("object", object);

        const response = await axios.post(
          "http://localhost:3000/slides",
          object,
        );
        console.log(response.data);
        toast.current?.show({
          severity: "info",
          summary: "Успех",
          detail: "Данные успешно загружены",
        });
      } catch (error) {
        console.error(error);
        toast.current?.show({
          severity: "error",
          summary: "Неудача",
          detail: "Во время загрузки произошла ошибка",
        });
      }
    }
  };

  const handleSubmit = () => {
    axios
      .get<File>(files[0]?.objectURL, { responseType: "blob" })
      .then(async (res) => {
        const result = new FormData();
        const textedBlob = await blobToBase64(res.data);

        result.append("id", uuidv4());
        result.append("name", formData.name);
        result.append("weight", formData.weight);
        result.append("price", formData.price);
        result.append("oldPrice", formData.oldPrice);
        result.append("image", textedBlob);

        let object = {};
        result.forEach((value, key) => {
          object[key] = value;
        });

        console.log("object", object);

        axios
          .post("http://localhost:3000/goods", object)
          .then((response) => {
            console.log(response.data);
            toast.current?.show({
              severity: "info",
              summary: "Успех",
              detail: "Данные успешно загружены",
            });
          })
          .catch((error) => {
            console.error(error);
            toast.current?.show({
              severity: "error",
              summary: "Неудача",
              detail: "Во время загрузки произошла ошибка",
            });
          });
      });

    // const bublik = mockCatalogue.map(item => {
    //   return {
    //     name: item.name,
    //     volume: item.volume,
    //     price: item.price || 0,
    //     oldPrice: 0,
    //     isSale: Boolean(random(0, 1)),
    //     isHit: Boolean(random(0, 1)),
    //     isNew: Boolean(random(0, 1)),
    //     reviews: random(1, 500),
    //     image: null,
    //     description: JSON.stringify({ ...item }),
    //     creationDate: dayjs(randomDate(new Date(2023, 0, 1), new Date())).format('YYYY-MM-DD')
    //   }
    // })

    // return bublik.map(async (item, i) => {
    //   const res = await axios.get<File>(files[i]?.objectURL, { responseType: "blob" });
    //   const result = new FormData();
    //   const textedBlob = await blobToBase64(res.data);

    //   result.append("id", files[i]?.name?.split('.')?.[0]);
    //   result.append("name", item.name);
    //   result.append("volume", item.volume);
    //   result.append("price", item.price);
    //   result.append("oldPrice", item.oldPrice);
    //   result.append("isSale", item.isSale);
    //   result.append("isHit", item.isHit);
    //   result.append("isNew", item.isNew);
    //   result.append("reviews", item.reviews);
    //   result.append("description", item.description);
    //   result.append("creationDate", item.creationDate);
    //   result.append("image", textedBlob);

    //   let object = {};
    //   result.forEach((value, key) => {
    //     object[key] = value;
    //   });

    //   axios
    //     .post("http://localhost:3000/goods", object)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // })
  };

  const contentMapper = {
    loadGoods: (
      <>
        <Form>
          <Checkbox
            value={onlyImages}
            checked={onlyImages}
            onChange={() => {
              setOnlyImages(!onlyImages);
              setFormData({
                id: "",
                name: "",
                weight: "",
                price: "",
                oldPrice: "",
                volume: "",
                dueDate: "",
                package: "",
                minRequest: "",
                description: "",
                ingridients: "",
              });
            }}
            label="Нажмите, если нужно просто обновить фото у существующего товара"
          ></Checkbox>

          {onlyImages ? (
            <>
              <p style={{ margin: " 20px 0", fontFamily: "arial" }}>
                Каждая картинка должна иметь название равное id товара, картинку
                которого вы хотите обновить
                <br />
                Например: <b>9c5cf625-387b-43be-b278-1386086cf7e5.jpg</b>
                <br />
                ID товара можно узнать на странице{" "}
                <b>&quot;Удалить продукты&quot;</b> (кнопка вверху)
              </p>
            </>
          ) : (
            <>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Heading.H1>Добавление нового товара</Heading.H1>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <label htmlFor="name">Название товара</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    name="volume"
                    id="volume"
                    value={formData?.volume}
                    onChange={(e) => handleChange("volume", e.target.value)}
                  />
                  <label htmlFor="volume">Вес или объем</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    name="dueDate"
                    id="dueDate"
                    value={formData?.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                  <label htmlFor="dueDate">Срок годности</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    name="package"
                    id="package"
                    value={formData?.package}
                    onChange={(e) => handleChange("package", e.target.value)}
                  />
                  <label htmlFor="package">Упаковка</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputTextarea
                    name="description"
                    id="description"
                    style={{ width: "100%" }}
                    rows={3}
                    value={formData?.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                  <label htmlFor="description">
                    Свободное описание (под картинкой)
                  </label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputTextarea
                    name="ingridients"
                    id="ingridients"
                    style={{ width: "100%" }}
                    rows={3}
                    value={formData?.ingridients}
                    onChange={(e) =>
                      handleChange("ingridients", e.target.value)
                    }
                  />
                  <label htmlFor="ingridients">Ингридиенты</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    keyfilter="money"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                  <label htmlFor="price">Цена (руб)</label>
                </span>
              </Row>
              <Row>
                <span className="p-float-label">
                  <InputText
                    name="oldPrice"
                    keyfilter="money"
                    id="oldPrice"
                    value={formData.oldPrice}
                    onChange={(e) => handleChange("oldPrice", e.target.value)}
                  />
                  <label htmlFor="oldPrice">Старая цена (необязательно)</label>
                </span>
              </Row>
            </>
          )}
        </Form>

        <FileUploadWrapper>
          <Toast ref={toast}></Toast>
          <Tooltip
            target=".custom-choose-btn"
            content="Выберите файл"
            position="bottom"
          />
          <Tooltip
            target=".custom-upload-btn"
            content="Загрузить"
            position="bottom"
          />
          <Tooltip
            target=".custom-cancel-btn"
            content="Очистить"
            position="bottom"
          />

          <FileUpload
            ref={fileUploadRef}
            invalidFileSizeMessageDetail={"Максимальный размер файла - 50 МБ"}
            invalidFileSizeMessageSummary={"Размер файла превышен"}
            name="files"
            accept="image/*"
            maxFileSize={500000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            multiple
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            // emptyTemplate={!isMobile ? emptyTemplate : undefined}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </FileUploadWrapper>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <SubmitButton onClick={handleSubmit}>Загрузить</SubmitButton>
        </Row>
      </>
    ),
    removeGoods: (
      <>
        <DataTable
          dataKey="id"
          size={"small"}
          globalFilterFields={["name", "id"]}
          filters={filters}
          removableSort
          stripedRows
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          header={renderHeader()}
          showGridlines
          value={goods}
          tableStyle={
            isMobile
              ? { maxWidth: "50rem" }
              : { minWidth: "50rem", maxWidth: "70rem", width: "100%" }
          }
        >
          <Column style={{ width: "45%" }} field="id" header="ID"></Column>
          <Column
            style={{ width: "35%" }}
            field="name"
            sortable
            header="Название"
          ></Column>
          <Column
            style={{ width: "20%" }}
            field="remove"
            body={(data) => (
              <Button
                style={{
                  backgroundColor: "#fffffff",
                  color: "red",
                  padding: "8px 16px",
                  borderRadius: "15px",
                }}
                text
                onClick={() => {
                  setItemForDelete({ id: data.id, name: data.name });
                  setDeleteModalOpen(true);
                }}
              >
                Удалить запись
              </Button>
            )}
            header="Удалить"
          ></Column>
        </DataTable>
      </>
    ),
    loadRecipes: (
      <>
        <Form>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Heading.H1>Добавление нового рецепта</Heading.H1>
          </Row>

          <Row>
            <span className="p-float-label">
              <InputText
                name="name"
                id="name"
                value={recipiesFormData.name}
                onChange={(e) => handleChangeRecipe("name", e.target.value)}
              />
              <label htmlFor="name">Название рецепта</label>
            </span>
          </Row>
          <Row>
            <span className="p-float-label">
              <InputTextarea
                name="ingridients"
                id="ingridients"
                style={{ width: "100%" }}
                rows={3}
                value={recipiesFormData?.ingridients}
                onChange={(e) =>
                  handleChangeRecipe("ingridients", e.target.value)
                }
              />
              <label htmlFor="ingridients">Ингридиенты</label>
            </span>
          </Row>
          <Row>
            <span className="p-float-label">
              <InputTextarea
                name="instructions"
                id="instructions"
                style={{ width: "100%" }}
                rows={3}
                value={recipiesFormData?.instructions}
                onChange={(e) =>
                  handleChangeRecipe("instructions", e.target.value)
                }
              />
              <label htmlFor="instructions">Инструкции</label>
            </span>
          </Row>
        </Form>

        <FileUploadWrapper>
          <Toast ref={toast}></Toast>
          <Tooltip
            target=".custom-choose-btn"
            content="Выберите файл"
            position="bottom"
          />
          <Tooltip
            target=".custom-upload-btn"
            content="Загрузить"
            position="bottom"
          />
          <Tooltip
            target=".custom-cancel-btn"
            content="Очистить"
            position="bottom"
          />

          <FileUpload
            ref={fileUploadRef}
            invalidFileSizeMessageDetail={"Максимальный размер файла - 5 МБ"}
            invalidFileSizeMessageSummary={"Размер файла превышен"}
            name="files"
            accept="image/*"
            maxFileSize={5000000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            multiple
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            // emptyTemplate={!isMobile ? emptyTemplate : undefined}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </FileUploadWrapper>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <SubmitButton onClick={handleSubmitRecipe}>Загрузить</SubmitButton>
        </Row>
      </>
    ),
    removeRecipes: (
      <>
        <DataTable
          dataKey="id"
          size={"small"}
          globalFilterFields={["name", "id"]}
          filters={filters}
          removableSort
          stripedRows
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          header={renderHeader()}
          showGridlines
          value={recipes}
          tableStyle={
            isMobile
              ? { maxWidth: "50rem" }
              : { minWidth: "50rem", maxWidth: "70rem", width: "100%" }
          }
        >
          <Column style={{ width: "45%" }} field="id" header="ID"></Column>
          <Column
            style={{ width: "35%" }}
            field="name"
            sortable
            header="Название"
          ></Column>
          <Column
            style={{ width: "20%" }}
            field="remove"
            body={(data) => (
              <Button
                style={{
                  backgroundColor: "#fffffff",
                  color: "red",
                  padding: "8px 16px",
                  borderRadius: "15px",
                }}
                text
                onClick={() => {
                  setItemForDelete({ id: data.id, name: data.name });
                  setDeleteModalRecipeOpen(true);
                }}
              >
                Удалить запись
              </Button>
            )}
            header="Удалить"
          ></Column>
        </DataTable>
      </>
    ),
    loadSlider: (
      <>
        <FileUploadWrapper>
          <Toast ref={toast}></Toast>
          <Tooltip
            target=".custom-choose-btn"
            content="Выберите файл"
            position="bottom"
          />
          <Tooltip
            target=".custom-upload-btn"
            content="Загрузить"
            position="bottom"
          />
          <Tooltip
            target=".custom-cancel-btn"
            content="Очистить"
            position="bottom"
          />

          <FileUpload
            ref={fileUploadRef}
            invalidFileSizeMessageDetail={"Максимальный размер файла - 5 МБ"}
            invalidFileSizeMessageSummary={"Размер файла превышен"}
            name="files"
            accept="image/*"
            maxFileSize={5000000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            multiple
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            // emptyTemplate={!isMobile ? emptyTemplate : undefined}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </FileUploadWrapper>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <SubmitButton onClick={handleSlidesSubmit}>Загрузить</SubmitButton>
        </Row>
      </>
    ),
    removeSlider: (
      <>
        <DataTable
          dataKey="id"
          size={"small"}
          globalFilterFields={["name", "id"]}
          filters={filters}
          removableSort
          stripedRows
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          header={renderHeader()}
          showGridlines
          value={slides}
          tableStyle={
            isMobile
              ? { maxWidth: "50rem" }
              : { minWidth: "50rem", maxWidth: "70rem", width: "100%" }
          }
        >
          <Column style={{ width: "45%" }} field="id" header="ID"></Column>
          <Column
            style={{ width: "35%" }}
            field="name"
            sortable
            header="Название"
          ></Column>
          <Column
            style={{ width: "20%" }}
            field="remove"
            body={(data) => (
              <Button
                style={{
                  backgroundColor: "#fffffff",
                  color: "red",
                  padding: "8px 16px",
                  borderRadius: "15px",
                }}
                text
                onClick={() => {
                  setItemForDelete({ id: data.id, name: data.name });
                  setDeleteModalSlideOpen(true);
                }}
              >
                Удалить запись
              </Button>
            )}
            header="Удалить"
          ></Column>
        </DataTable>
      </>
    ),
  };

  return (
    <>
      <MainHeader isCart={true} />
      <ScrollToTopOnMount />
      <div
        style={{
          width: "100%",
          background: "#cccccc7b",
          marginTop: "-20px",
          paddingTop: "30px",
        }}
      >
        {" "}
        <BackLinkAtom id={"backButton"} to={"/goods"} children={"Назад"} />
      </div>
      <AdminControlWrapper>
        <ButtonFacade>
          {buttons.map((item) => {
            return (
              <>
                <Button
                  style={{
                    backgroundColor: "#008054",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "15px",
                  }}
                  text
                  onClick={() => {
                    setContent(item.content);
                    setFormData({
                      id: "",
                      name: "",
                      weight: "",
                      price: "",
                      oldPrice: "",
                      volume: "",
                      dueDate: "",
                      package: "",
                      minRequest: "",
                      description: "",
                      ingridients: "",
                    });
                    setItemForDelete({ id: null, name: "" });
                  }}
                >
                  {item.text}
                </Button>
              </>
            );
          })}
        </ButtonFacade>

        <AdminContainer>
          {contentMapper[content as keyof typeof contentMapper]}

          <Dialog
            header="Подтвердите удаление записи"
            visible={isDeleteModalOpened}
            style={isMobile ? { width: "94vw" } : { width: "50vw" }}
            onHide={() => setDeleteModalOpen(false)}
            footer={
              <>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                    marginRight: "20px",
                  }}
                  text
                  onClick={() => deleteItem(itemForDelete)}
                >
                  УДАЛИТЬ
                </Button>
                <Button
                  style={{
                    backgroundColor: "#0f0080",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                  }}
                  text
                  onClick={() => setDeleteModalOpen(false)}
                >
                  ОТМЕНА
                </Button>
              </>
            }
          >
            <p className="m-0">
              Вы действительно хотите удалить <b>{itemForDelete.name}</b> под
              номером: <b>{itemForDelete.id}</b>?
            </p>
          </Dialog>

          <Dialog
            header="Подтвердите удаление записи"
            visible={isDeleteModalRecipeOpened}
            style={isMobile ? { width: "94vw" } : { width: "50vw" }}
            onHide={() => setDeleteModalRecipeOpen(false)}
            footer={
              <>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                    marginRight: "20px",
                  }}
                  text
                  onClick={() => deleteItemRecipe(itemForDelete)}
                >
                  УДАЛИТЬ
                </Button>
                <Button
                  style={{
                    backgroundColor: "#0f0080",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                  }}
                  text
                  onClick={() => setDeleteModalRecipeOpen(false)}
                >
                  ОТМЕНА
                </Button>
              </>
            }
          >
            <p className="m-0">
              Вы действительно хотите удалить <b>{itemForDelete.name}</b> под
              номером: <b>{itemForDelete.id}</b>?
            </p>
          </Dialog>

          <Dialog
            header="Подтвердите удаление записи"
            visible={isDeleteModalSlideOpened}
            style={isMobile ? { width: "94vw" } : { width: "50vw" }}
            onHide={() => setDeleteModalSlideOpen(false)}
            footer={
              <>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                    marginRight: "20px",
                  }}
                  text
                  onClick={() => deleteItemSlide(itemForDelete)}
                >
                  УДАЛИТЬ
                </Button>
                <Button
                  style={{
                    backgroundColor: "#0f0080",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "15px",
                  }}
                  text
                  onClick={() => setDeleteModalSlideOpen(false)}
                >
                  ОТМЕНА
                </Button>
              </>
            }
          >
            <p className="m-0">
              Вы действительно хотите удалить слайд под номером:{" "}
              <b>{itemForDelete.id}</b>?
            </p>
          </Dialog>
        </AdminContainer>
      </AdminControlWrapper>
    </>
  );
};
