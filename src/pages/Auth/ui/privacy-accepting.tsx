import { Link } from 'react-router-dom'

export default function PrivacyAccepting() {
  return (
    <p>
      <span>Нажимая “Зарегистрироваться”, вы принимаете условия </span>
      {/* TODO: нет этих страниц и маршрутов */}
      <Link to="/privacy-policy" className="text-primary hover:text-primary-active font-bold">
        политики конфиденциальности
      </Link>
      <span> и </span>
      <Link to="/terms-of-service" className="text-primary hover:text-primary-active font-bold">
        пользовательского соглашения
      </Link>
    </p>
  )
}
