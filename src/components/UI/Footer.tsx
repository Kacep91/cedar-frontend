export const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="#">
            <i className="icon ion-social-instagram"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-snapchat"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-twitter"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-facebook"></i>
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Наверх</a>
          </li>
          <li className="list-inline-item">
            <a href="#">О нас</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Продукты</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Документы</a>
          </li>
        </ul>
        <p className="copyright">Siberia Organic © 2023</p>
      </footer>
    </div>
  );
};
