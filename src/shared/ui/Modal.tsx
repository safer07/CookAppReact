import Button, { ButtonType } from "./Button";

type ModalProps = {
  title: string;
  text?: string;
  open: boolean;
  setOpen: (status: boolean) => void;
  onOk: () => void;
  okText?: string;
  type?: "negative";
  children?: React.ReactNode;
  textAlign?: "left" | "center";
};

export default function Modal({
  title,
  text,
  open,
  setOpen,
  onOk,
  okText = "ОК",
  type,
  children,
  textAlign = "center",
}: ModalProps) {
  const textAlignClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      default:
        return;
    }
  };

  function onClickOk() {
    setOpen(false);
    onOk();
  }

  return (
    <div className={`modal`} data-open={open}>
      <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
      <div className={`modal-content ${textAlignClass}`}>
        <p className="headline-medium">{title}</p>
        {text && <p className="mt-2 text-secondary-color">{text}</p>}

        {children}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            text="Отмена"
            onClick={() => setOpen(false)}
            type={ButtonType.TERTIARY}
            block
          />
          <Button
            text={okText}
            onClick={onClickOk}
            type={
              type === "negative" ? ButtonType.NEGATIVE : ButtonType.PRIMARY
            }
            block
          />
        </div>
      </div>
    </div>
  );
}
