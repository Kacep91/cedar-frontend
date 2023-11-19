import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
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
import { BackLinkAtom } from "./atoms";
import { mockCatalogue } from "mocks/catalogue";
import { random } from "lodash";
import dayjs from "dayjs";

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
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;

  background: #cccccc7b;
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
`;

export const AdminPanel = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    weight: "",
    price: "",
    oldPrice: "",
    isSale: false,
    isHit: false,
    isNew: false,
    reviews: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <span>{formatedValue} / 5 МБ</span>
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

  const emptyTemplate = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Выберите изображение или перетащите его в поле
        </span>
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

  async function blobToBuffer(blob: Blob): Promise<{ type: string; data: number[]; }> {
    const arrayBuffer = await blob.arrayBuffer();
    const data = Array.from(new Uint8Array(arrayBuffer));
    return { type: "Buffer", data: data };
  }

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  console.log(dayjs(randomDate(new Date(2023, 0, 1), new Date())).format('YYYY-MM-DD'))

  const handleSubmit = () => {

    const bublik = mockCatalogue.map(item => {
      return {
        name: item.name,
        volume: item.volume,
        price: item.price || 0,
        oldPrice: 0,
        isSale: Boolean(random(0, 1)),
        isHit: Boolean(random(0, 1)),
        isNew: Boolean(random(0, 1)),
        reviews: random(1, 500),
        image: null,
        description: JSON.stringify({ ...item }),
        creationDate: dayjs(randomDate(new Date(2023, 0, 1), new Date())).format('YYYY-MM-DD')
      }
    })

    return bublik.map(async (item, i) => {
      const res = await axios.get<File>(files[i]?.objectURL, { responseType: "blob" });
      const result = new FormData();
      const textedBlob = await blobToBase64(res.data);

      result.append("id", files[i]?.name?.split('.')?.[0]);
      result.append("name", item.name);
      result.append("volume", item.volume);
      result.append("price", item.price);
      result.append("oldPrice", item.oldPrice);
      result.append("isSale", item.isSale);
      result.append("isHit", item.isHit);
      result.append("isNew", item.isNew);
      result.append("reviews", item.reviews);
      result.append("description", item.description);
      result.append("creationDate", item.creationDate);
      result.append("image", textedBlob);

      let object = {};
      result.forEach((value, key) => {
        object[key] = value;
      });

      axios
        .post("http://185.70.185.67:5000/admin/image", object)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    })

  };

  return (
    <AdminContainer>
      <BackLinkAtom to={"/"} children={"Назад"} />
      <Form>
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
              keyfilter="pnum"
              name="volume"
              id="volume"
              value={formData.volume}
              onChange={(e) => handleChange("volume", e.target.value)}
            />
            <label htmlFor="volume">Вес или объем</label>
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
        <Row>
          <Checkbox
            label="Распродажа"
            checked={formData.isSale}
            value={formData.isSale}
            onChange={(e) => handleChange("isSale", e.target.checked)}
          />
        </Row>
        <Row>
          <Checkbox
            label="Хит"
            checked={formData.isHit}
            value={formData.isHit}
            onChange={(e) => handleChange("isHit", e.target.checked)}
          />
        </Row>
        <Row>
          <Checkbox
            label="Новый"
            checked={formData.isNew}
            value={formData.isNew}
            onChange={(e) => handleChange("isNew", e.target.checked)}
          />
        </Row>
        <Row>
          <span className="p-float-label">
            <InputText
              keyfilter="pint"
              name="reviews"
              id="reviews"
              value={formData.reviews}
              onChange={(e) => handleChange("reviews", e.target.value)}
            />
            <label htmlFor="reviews">Количество отзывов</label>
          </span>
        </Row>
      </Form>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
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
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
        />
      </div>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <SubmitButton onClick={handleSubmit}>Загрузить</SubmitButton>
      </Row>
    </AdminContainer>
  );
};
