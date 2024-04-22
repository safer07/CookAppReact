import Button from "./Button";
import ButtonIcon from "./ButtonIcon";

type PhotoUploadProps = {
  image?: string;
  onChange: (value: string) => void;
  label?: string;
};

export default function PhotoUpload({
  image,
  onChange,
  label,
}: PhotoUploadProps): JSX.Element {
  const url = "/images/recipes/recipe-1.jpg";

  function setImage(): void {
    onChange(url);
  }

  if (!image) {
    return (
      <div>
        {label && <div className="input-label">{label}</div>}
        <div className="flex flex-col items-center gap-3 rounded-lg border border-base-borders bg-base-bg px-2 pb-3 pt-5 text-center">
          <svg className="size-5">
            <use href="/images/icons.svg#camera" />
          </svg>
          <Button text="Загрузить фото" onClick={setImage} variant="primary" />
          <p>
            Пожалуйста используйте только свои уникальные фотографии. Формат:
            JPEG, JPG, PNG. Размер: до&nbsp;10&nbsp;Mb.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {label && <div className="input-label">{label}</div>}
      <div className="relative">
        <img
          className="aspect-[9/7] w-full object-cover"
          src={image}
          alt="Загруженное изображение"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <ButtonIcon icon="camera" onClick={setImage} />
          <ButtonIcon icon="delete" onClick={() => onChange("")} />
        </div>
      </div>
    </div>
  );
}
