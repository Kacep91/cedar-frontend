import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { CartActions } from "store/cart";
import { useScreenSize } from "utils/hooks";

type ClearCartModalProps = {
  isDeleteModalOpened: boolean;
  setDeleteModalOpen: (value: boolean) => void;
};

export const ClearCartModal = ({
  isDeleteModalOpened,
  setDeleteModalOpen,
}: ClearCartModalProps) => {
  const dispatch = useDispatch();
  const isMobile = useScreenSize("mobile");

  return (
    <Dialog
      header="Подтвердите очистку корзины"
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
            onClick={() => {
              dispatch(CartActions.reset());
              setDeleteModalOpen(false);
            }}
          >
            ОЧИСТИТЬ
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
      <p className="m-0">Вы действительно хотите очистить корзину?</p>
    </Dialog>
  );
};
