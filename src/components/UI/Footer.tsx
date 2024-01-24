import vkLogo from "../../assets/images/vkLogo.svg";
import telegram from "../../assets/images/telegram.svg";
import infoDocument from "../../assets/documents/Паспорт_организации.doc";
export const Footer = () => {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = infoDocument;
    link.download = "Паспорт_организации.doc";
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const currentYear = new Date()?.getFullYear();

  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://vk.com/siberia.organic">
            <img
              width="24"
              height="24"
              style={{
                marginLeft: "-2px",
                marginTop: "-4px",
                filter: "grayscale(100%)",
              }}
              alt=""
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
              alt=""
              src={telegram}
            />
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/aboutUs">О нас</a>
          </li>
          <li className="list-inline-item">
            <a href="/goods">Продукты</a>
          </li>
          <li className="list-inline-item">
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadFile();
              }}
            >
              Документы
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/contacts">Контакты</a>
          </li>
        </ul>
        <p className="copyright">Siberia Organic © {currentYear}</p>
      </footer>
    </div>
  );
};
