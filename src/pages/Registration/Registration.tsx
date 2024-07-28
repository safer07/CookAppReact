import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TopAppBar from "../../widgets/TopAppBar";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

type registrationFormDataType = {
  email: string;
  password: string;
  passwordRepeat: string;
};

const emptyForm = { email: "", password: "", passwordRepeat: "" };

export default function Registration(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<registrationFormDataType>(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);

  // проверять токен в localStorage и перенаправлять
  // navigate("/profile", { replace: true });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData),
    };
    let ok: boolean;

    if (formData.password !== formData.passwordRepeat) {
      return setErrors(["Пароль не совпадает"]);
    }

    try {
      // http://localhost:4444/registration
      fetch(
        "https://cook-app-backend-psi.vercel.app/registration",
        requestOptions,
      )
        .then((response) => {
          // подтверждение отправки
          // здесь приходит код 400
          console.log(response);
          ok = response.ok;
          return response.json();
        })
        .then((data) => {
          // ответ на POST-запрос
          // при неудачном здесь приходит массив с ошибками
          //   [
          //     {
          //         "type": "field",
          //         "value": "1@1",
          //         "msg": "Неверный формат почты",
          //         "path": "email",
          //         "location": "body"
          //     },
          //     {
          //         "type": "field",
          //         "value": "12",
          //         "msg": "Пароль должен быть минимум 5 символов",
          //         "path": "password",
          //         "location": "body"
          //     }
          // ]
          console.log(data);
          console.log(data?.message);
          console.log(data?.token);
          if (ok) {
            // сохранить токен
            navigate("/profile", { replace: true });
          } else {
            if (Array.isArray(data)) setErrors(data.map((error) => error.msg));
            else setErrors([data?.message]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TopAppBar title="Регистрация" back />
      <form className="mt-2 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
            type="email"
            label="Email"
          />
          <Input
            value={formData.password}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, password: value }))
            }
            type="password"
            label="Пароль"
          />
          <Input
            value={formData.passwordRepeat}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, passwordRepeat: value }))
            }
            type="password"
            label="Повторите пароль"
          />
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p className="text-system-error" key={index}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
        <p>
          <span>Нажимая “Зарегистрироваться”, вы принимаете условия </span>
          <Link
            to="/privacy-policy"
            className="font-bold text-primary hover-hover:hover:text-primary-active"
          >
            политики конфиденциальности
          </Link>
          <span> и </span>
          <Link
            to="/terms-of-service"
            className="font-bold text-primary hover-hover:hover:text-primary-active"
          >
            пользовательского соглашения
          </Link>
        </p>
        <Button
          variant="primary"
          text="Зарегистрироваться"
          onClick={() => {}}
          block
        />
      </form>
      <div className="mt-auto py-2 text-center">
        <span>Уже есть аккаунт? </span>
        <Link
          to="/login"
          className="font-bold text-primary hover-hover:hover:text-primary-active"
        >
          Вход
        </Link>
      </div>
    </>
  );
}
