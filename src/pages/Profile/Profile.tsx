import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setActiveTab } from "../../redux/slices/navBarSlice";
import Button from "../../ui/Button";
import ListItem from "../../ui/ListItem";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab(1));
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 py-2">
        <div className="grid size-10 shrink-0 place-content-center rounded-full bg-base-bg">
          <svg className="size-5">
            <use href="/images/icons.svg#user" />
          </svg>
        </div>
        <Button text="Войти" icon="login" onClick={() => {}} block />
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