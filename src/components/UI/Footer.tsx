import vkLogo from "../../assets/images/vkLogo.svg";
import telegram from "../../assets/images/telegram.svg";
export const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://instagram.com/siberia.organic?igshid=OGQ5ZDc2ODk2ZA==">
            <i className="icon ion-social-instagram"></i>
          </a>
          <a href="https://vk.com/siberia.organic">
            <img
              width="24"
              height="24"
              style={{
                marginLeft: "-2px",
                marginTop: "-4px",
                filter: "grayscale(100%)",
              }}
              src={vkLogo}
            />
          </a>
          <a href="https://t.me/siberiaorganic">
            <img
              width="24"
              height="24"
              style={{
                marginLeft: "-2px",
                marginTop: "-4px",
                filter: "grayscale(100%)",
              }}
              src={telegram}
            />
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Наверх</a>
          </li>
          <li className="list-inline-item">
            <a href="/aboutUs">О нас</a>
          </li>
          <li className="list-inline-item">
            <a href="/goods">Продукты</a>
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
