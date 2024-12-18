import { Link } from 'react-router-dom'

export default function PrivacyAccepting() {
  return (
    <p>
      <span>Нажимая “Зарегистрироваться”, вы принимаете условия </span>
      {/* TODO: нет этих страниц и маршрутов */}
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
  )
}
