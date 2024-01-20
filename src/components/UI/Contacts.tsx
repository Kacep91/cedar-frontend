import React, { useEffect } from "react";
import { ScrollTop } from "primereact/scrolltop";
import MainHeader from "./MainHeader";
import { ContactsWrapper, ContactRow } from "components/atoms";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";

export const Contacts = () => {
  const mapState = {
    center: [56.041059, 92.85515],
    zoom: 15,
    zoomControl: true,
  };

  const YandexMap = () => (
    <YMaps>
      <Map state={mapState} width="100%" height="400px">
        <Placemark geometry={[56.041059, 92.85515]} />
        <ZoomControl options={{ float: "left" }} />
      </Map>
    </YMaps>
  );

  return (
    <>
      <MainHeader isCart={true} />
      <ScrollTop />
      <ContactsWrapper>
        <h2>Контакты</h2>
        <ContactRow>
          <b>Главный офис</b>
        </ContactRow>
        <ContactRow style={{ marginBottom: "20px" }}>
          Адрес: Красноярск, БРЯНСКАЯ 2-я, Дом 47А, помещение 2{" "}
        </ContactRow>

        <ContactRow>
          <b>Телефон по вопросам сотрудничества</b>
        </ContactRow>
        <ContactRow>
          <a href="tel:89135349418">+7 913 534-94-18</a>
        </ContactRow>

        <YandexMap />

        <h3>Реквизиты</h3>
        <ContactRow>
          ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ГРАСС»
        </ContactRow>

        <ContactRow>
          <b>ИНН</b> 2466221979
        </ContactRow>
        <ContactRow>
          <b>КПП</b> 246601001
        </ContactRow>
        <ContactRow>
          <b>ОГРНИП</b> <span>1092468029048</span>
        </ContactRow>
        <ContactRow>
          <b>Юридический адрес</b> 660048, Красноярский край, Красноярск г,
          Брянская 2-я ул, дом №47А, пом. 2
        </ContactRow>
        <ContactRow>
          Тел <a href="tel:89135345264">+7 913 534 52 64</a>
        </ContactRow>
      </ContactsWrapper>
    </>
  );
};
