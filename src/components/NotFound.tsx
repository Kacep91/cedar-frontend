import React from "react";

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Страница не найдена</h2>
        <p>
          Страница, на которую вы обращаетесь — не существует. Возможно, вы
          ввели неправильный адрес или страница была удалена.
        </p>
        <a href="/">Вернуться на главную</a>
      </div>
    </div>
  );
};

export default NotFound;
