import { useState, useEffect } from "react";

export const getEnv = function (key) {
  // читаем параметры из .env файла и используем их как переменные
  if (window._env_ && window._env_[key]) return window._env_[key];

  return process.env[key];
};

export const parseValueToString = (value, isNA = true) => {
  // парсер значения графиков
  return value ? parseFloat(value).toLocaleString("ru") : isNA ? "N/A" : "0";
};

export function abbreviateNumber(value) {
  // сокращение больших чисел
  let newValue = value;
  if (value >= 1000) {
    const suffixes = ["", " тыс", " млн", " млрд", " трлн"];
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = "";
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      );
      const dotLessShortValue = (shortValue + "").replace(
        /[^a-zA-Z 0-9]+/g,
        "",
      );
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

export const formatPrice = (price) => {
  // округление сумм до 2 цифр после запятой в русском формате
  const isNotRound = String(price).includes(".");
  let value = price;
  if (isNotRound) {
    value =
      String(price).split(".")[1].length < 2
        ? String(price).replace(".", ",") + "0"
        : String(price).replace(".", ",");
  } else {
    value = String(price) + ",00";
  }
  return value;
};

export function useHoldPress(callback = () => {}, ms = 300) {
  // хук для удобной горизонтальной прокрутки графиков на экранах мобильных устройств
  const [startHoldPress, setStartHoldPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startHoldPress) {
      timerId = setInterval(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startHoldPress]);

  return {
    onMouseDown: () => setStartHoldPress(true),
    onMouseUp: () => setStartHoldPress(false),
    onMouseLeave: () => setStartHoldPress(false),
    onTouchStart: () => setStartHoldPress(true),
    onTouchEnd: () => setStartHoldPress(false),
  };
}

export const defaultDate = new Date(
  new Date().setMonth(new Date().getMonth() - 1),
);

export const roundPercent = (value, digitsAfterDot = 2, retainDot = false) => {
  // округление чисел до 2 цифр после запятой
  return value
    ? String(
        Number(
          Math.round(
            value.toString().trim().replace(",", ".").slice(0, 18) +
              "e" +
              digitsAfterDot,
          ) +
            "e-" +
            digitsAfterDot,
        ),
      )
    : retainDot
      ? "0.0"
      : "0";
};

export const stringToBoolean = (string) => {
  // для парсинга localStorage значений boolean :)
  return !string || string === "false" ? false : true;
};

export const hours = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
];

export const russianDaysOfWeekShort = [
  "пн",
  "вт",
  "ср",
  "чт",
  "пт",
  "сб",
  "вс",
];

export const groupBy = (array, key) => {
  // отсортировать массив по ключу
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
};

export const sortByLabel = (a, b) => {
  if (a.label > b.label) {
    return 1;
  } else if (a.label < b.label) {
    return -1;
  }
  return 0;
};

export const sortDate = (a, b) => {
  if (new Date(a) > new Date(b)) {
    return 1;
  } else if (new Date(a) < new Date(b)) {
    return -1;
  }
  return 0;
};

export const sortByDate = (a, b) => {
  if (new Date(a.date) > new Date(b.date)) {
    return 1;
  } else if (new Date(a.date) < new Date(b.date)) {
    return -1;
  }
  return 0;
};

/**
 * @param {String} value - цифровое значение с типом "string"
 * @param {String} word - меняющиеся слово
 * @return {String} - слово "день" с правильным окончанием зависящим от его кол-ва
 */
export function getWord(value, word) {
  const lastTwoNumber = value.substr(-2);
  const isTenPlus =
    lastTwoNumber.length === 2 && lastTwoNumber.substr(-2, 1) === "1";
  const lastNumber = lastTwoNumber.substr(-1);

  const wordMap = {
    отзыв: { 1: "отзыв", 234: "отзыва", def: "отзывов" },
  };

  if (lastNumber === "1" && !isTenPlus) {
    return wordMap[word][1];
  } else if (/(2|3|4)/.test(lastNumber) && !isTenPlus) {
    return wordMap[word][234];
  }
  return wordMap[word].def;
}

export const removeUnusedKeys = (
  object, // удаляем ключи с пустыми значениями, пустые массивы, Null, undefined, пустые строки и т.д.
) =>
  Object.fromEntries(
    Object.entries(object)
      .filter(([_, v]) => v !== null)
      .filter(([_, v]) => v !== 0)
      .filter(([_, v]) => v !== undefined)
      .filter(([_, v]) => v !== "")
      .filter(([_, v]) => JSON.stringify(v) !== "[]")
      .map(([k, v]) => [
        k,
        v === Object(v) && !Array.isArray(v) ? removeUnusedKeys(v) : v,
      ]),
  );

export const russianMonths = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
};

export const periodItems = [
  { label: "За всё время", value: null },
  { label: "Прошлая неделя", value: "week" },
  { label: "Сегодня", value: "today" },
  { label: "Год", value: "year" },
];

export function sumOfTime(timeOne, timeTwo) {
  const hoursOne = timeOne.split(":")[0];
  const minutesOne = timeOne.split(":")[1];
  const hoursTwo = timeTwo.split(":")[0];
  const minutesTwo = timeTwo.split(":")[1];

  const sumOfHours = parseInt(hoursOne) + parseInt(hoursTwo);
  const sumOfMinutes = parseInt(minutesOne) + parseInt(minutesTwo);
  const hourResult = sumOfHours + Math.floor(sumOfMinutes / 60);
  let minutesResult = sumOfMinutes % 60;
  minutesResult = minutesResult < 10 ? "0" + minutesResult : minutesResult;

  return hourResult + ":" + minutesResult;
}

export function secondsToTime(e, isMobile = false) {
  const m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return m + (isMobile ? "м " : " мин ") + s + (isMobile ? "с" : " сек");
}

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};

export const downloadFiles = (downloadFile) => {
  const bin = atob(downloadFile);
  const ab = s2ab(bin);
  const blob = new Blob([ab], { type: "application/octet-stream" });
  const fileName = `report_KKT_${new Date()
    .toLocaleString("ru-RU")
    .replace(/[.]|:|/g, "")
    .replace(", ", "_")}.xlsx`;

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = fileName;
    a.type = "text/html";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }
};

export function stableSort(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const phoneRegex = /^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/;

export const cardNotion = [
  {
    text: "Наименование",
  },
  {
    text: "Цена за штуку",
  },
  {
    text: "Итого",
  },
  {
    text: "Количество",
  },
];

export function arrayBufferToBase64(buffer) {
  if (!buffer) {
    return "";
  }
  let binary = "";
  let bytes = new Uint8Array(buffer.data);
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return binary;
}

export function categorizeProducts(products, labels) {
  const result = {};

  labels.forEach((label) => {
    result[label.label] = [];
  });

  products.forEach((product) => {
    labels.forEach((label) => {
      label.match.some((match) => {
        if (product.name.toLowerCase().includes(match.toLowerCase())) {
          result[label.label].push(product);
          return true;
        }
        return false;
      });
    });
  });

  return result;
}

export function categorizeRecipeByName(inputArray) {
  const result = selectedLabels.find((item) => {
    return inputArray.some((element) => item.match.includes(element));
  });
  return result ? result.label : null;
}

export const selectedLabels = [
  {
    label: "Сибирские напитки",
    match: ["сбитень", "медово-", "кофе", "чай", "-чай"],
  },
  {
    label: "Сибирские сладости",
    match: ["печенье", "цукаты", "урбеч", "пралине", "варенье", "джем"],
  },
  {
    label: "Сибирский мёд",
    match: ["десерт", "медовой", "медово-"],
  },
  {
    label: "Сибирская ягода",
    match: ["вяленая", "сушеная", "сушеными", "ягодами", "жимолость"],
  },
  {
    label: "Сибирские грибы",
    match: ["гриб", "грибами", "грибов", "лисичка", "приправа", "суп"],
  },
  {
    label: "Сибирское масло",
    match: ["пищевое масло"],
  },
  {
    label: "Сибирская косметика",
    match: ["эфирное масло"],
  },
  {
    label: "Сибирские бады",
    match: ["спрей", "комплекс"],
  },
  {
    label: "Сибирская гранола",
    match: ["гранола"],
  },
];

export function transformArray(array) {
  let result = [];

  if (!array) {
    return [];
  }

  array.map((item) => {
    if (item.video) {
      let videos = item?.video?.split(", ");
      videos?.map((video) => {
        result.push({ id: item?.id, video: video });
      });
    }
    if (item?.image) {
      result.push({ id: item?.id, image: item?.image });
    }
  });
  return result;
}

export const transformRecipesToSlidesArray = (data) => {
  if (data && data.video) {
    return transformArray(data?.video?.split(","));
  } else {
    return [{ ...data }];
  }
};
