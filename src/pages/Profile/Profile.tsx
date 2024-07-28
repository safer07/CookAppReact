import { Link } from "react-router-dom";

import Button from "../../shared/ui/Button";
import ListItem from "../../shared/ui/ListItem";

export default function Profile(): JSX.Element {
  // TODO: сделать выйти (стереть из localStorage)

  return (
    <>
      <div className="flex items-center gap-2 py-2">
        <div className="surface-low grid size-10 shrink-0 place-content-center rounded-full">
          <svg className="size-5">
            <use href="/images/icons.svg#user" />
          </svg>
        </div>
        <Link to="/login" className="w-full">
          <Button text="Войти" icon="login" block />
        </Link>
      </div>
      <ul className="layout-fullwidth py-1">
        <ListItem
          text="Пользовательское соглашение"
          rightElement={{
            element: "icon",
            icon: "chevron_right",
          }}
        />
        <ListItem
          text="Политика конфиденциальности"
          rightElement={{
            element: "icon",
            icon: "chevron_right",
          }}
        />
      </ul>
    </>
  );
}
