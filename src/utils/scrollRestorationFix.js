import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("pathname", pathname);
    const backButton = document.getElementById("backButton");
    console.log("backButton", backButton);
    setTimeout(
      () =>
        backButton.scrollIntoView({
          time: 500,
          align: {
            top: 0.1,
          },
        }),
      50,
    );
  }, [pathname]);

  return null;
};

export default ScrollToTopOnMount;
