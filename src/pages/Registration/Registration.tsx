import React from "react"
import s from "./Registration.module.scss"
import RegistrationForm from "../../components/RegistrationForm"

function Registration() {
  return (
    <main className={s.registration}>
      <section className={s.registration__image}>
        <img
          src="src\assets\whatsapp.svg"
          alt="whatsapp"
          className={s.image__svg}
        />
      </section>
      <section className={s.registration__form}>
        <h1 className={s.form__header}>
          Welcome to Green API WhatsApp service
        </h1>
        <RegistrationForm />
      </section>
    </main>
  )
}

export default Registration
