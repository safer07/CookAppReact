import ReactDOM from "react-dom";

import useMount from "./hooks/useMount";
import Button from "../Button";

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
  const mounted = useMount(open);
  const textAlignClass = (() => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      default:
        return;
    }
  })();

  function onClickOk() {
    setOpen(false);
    onOk();
  }

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className="modal" data-open={open} role="dialog">
      <div
        className="modal-backdrop"
        onClick={() => setOpen(false)}
        tabIndex={0}
        role="button"
      ></div>
      <div className={`modal-content ${textAlignClass}`}>
        <p className="headline-medium">{title}</p>
        {text && <p className="mt-2 text-secondary-color">{text}</p>}

        {children}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            text="Отмена"
            onClick={() => setOpen(false)}
            variant="tertiary"
            block
          />
          <Button
            text={okText}
            onClick={onClickOk}
            variant={type === "negative" ? "negative" : "primary"}
            block
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-portal")!,
  );
}
