import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import s from "./RegistrationForm.module.scss"
import { useStore } from "../../store/userStore"

function RegistrationForm() {
  const { IdInstance, setIdInstance, setApiTokenInstance } = useStore()
  const [idInstanceState, setIdInstanceState] = useState<string>("")
  const [ApiTokenInstanceState, setApiTokenInstanceState] = useState<string>("")
  const [errorState, setErrorState] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    fetch(
      `https://api.green-api.com/waInstance${idInstanceState}/getStateInstance/${ApiTokenInstanceState}`
    )
      .then(() => {
        setIdInstance(idInstanceState)
        setApiTokenInstance(ApiTokenInstanceState)
        document.cookie = `idInstance=${idInstanceState}; path=/; max-age=3600`
        document.cookie = `ApiTokenInstance=${ApiTokenInstanceState}; path=/ ;max-age=3600`
        setErrorState(false)

        navigate("/")
      })
      .catch(() => setErrorState(true))
  }

  return (
    <form onSubmit={(e) => e.preventDefault} className={s.form}>
      <div className={s.form__input}>
        <legend className={s.input__legend}>IdInstance</legend>
        <input
          placeholder="Enter your IdInstance"
          required
          minLength={5}
          type="text"
          value={idInstanceState}
          onChange={(e) => setIdInstanceState(e.target.value)}
          className={s.input__field}
        />
      </div>
      <div className={s.form__input}>
        <legend className={s.input__legend}>ApiTokenInstance</legend>
        <input
          placeholder="Enter your ApiTokenInstance"
          type="text"
          value={ApiTokenInstanceState}
          onChange={(e) => setApiTokenInstanceState(e.target.value)}
          className={s.input__field}
        />
      </div>
      {errorState && <p className={s.form__error}>Invalid data</p>}
      <button
        onClick={() => handleSubmit()}
        disabled={
          idInstanceState.length < 1 || ApiTokenInstanceState.length < 1
        }
        type="button"
        className={s.form__btn}
      >
        Connect
      </button>
    </form>
  )
}

export default RegistrationForm
