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
  cancellable?: boolean;
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
  textAlign,
  cancellable,
}: ModalProps): JSX.Element | null {
  const mounted = useMount(open);
  const textAlignClass = (() => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "center":
      default:
        return "text-center";
    }
  })();

  function onClickOk(): void {
    setOpen(false);
    onOk();
  }

  function onBackDropClick(): void {
    if (cancellable) setOpen(false);
    else onOk();
  }

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className="modal" data-open={open} role="dialog">
      <div
        className="modal-backdrop"
        onClick={onBackDropClick}
        tabIndex={0}
        role="button"
      ></div>
      <div className={`modal-content ${textAlignClass}`}>
        <p className="headline-medium">{title}</p>
        {text && <p className="mt-2 text-secondary-color">{text}</p>}

        {children}

        <div className={`mt-3 grid ${cancellable ? "grid-cols-2" : ""}  gap-2`}>
          {cancellable && (
            <Button
              text="Отмена"
              onClick={() => setOpen(false)}
              variant="tertiary"
              block
            />
          )}
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
