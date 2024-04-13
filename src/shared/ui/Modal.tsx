import Button, { ButtonType } from "./Button";

export enum ModalType {
  WARNING = "warning",
}

type ModalProps = {
  title: string;
  text: string;
  open: boolean;
  setOpen: (status: boolean) => void;
  onOk: () => void;
  type?: ModalType;
};

export default function Modal({
  title,
  text,
  open,
  setOpen,
  onOk,
  type,
}: ModalProps) {
  function onClickOk() {
    setOpen(false);
    onOk();
  }

  return (
    <div className={`modal`} data-open={open}>
      <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
      <div className="modal-content">
        <p className="headline-medium">{title}</p>
        <p className="mt-2 text-secondary-color">{text}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            text="Отмена"
            onClick={() => setOpen(false)}
            type={ButtonType.TERTIARY}
            block
          ></Button>
          <Button
            text="Удалить"
            onClick={onClickOk}
            type={
              type === ModalType.WARNING
                ? ButtonType.WARNING
                : ButtonType.PRIMARY
            }
            block
          ></Button>
        </div>
      </div>
    </div>
  );
}
