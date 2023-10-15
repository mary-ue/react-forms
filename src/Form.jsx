import { useState } from 'react';
import _ from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validEmail = value => {
    setEmailError(/^.+@.+\..+$/.test(value));
  }

  const handleEmail = ({ target }) => {
    setEmail(target.value);
    validEmail(target.value);
  };

  const validPassword = (value) => {
    // Пароль (6 символов, строчная и прописаная буква, цифра и спецсимвол)
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value));
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleSave = ({ target }) => {
    setSave(target.checked);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!emailError || !passwordError) {
      setCheckErrorForm(true);
      return;
    }

    setIsPending(true);

    console.log({
      email,
      password,
      save
    })
  }

  return (
    <form className={_.form} onSubmit={handleSubmit}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor="email">
          Email
        </label>
        <input
          className={_.input}
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleEmail}
          onBlur={() => setEmailDirty(true)}
          disabled={isPending}
        />
        {!emailError && emailDirty &&
          <p className={_.error}>Сообщение об ошибке</p>}
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor="password">Пароль</label>
        <input
          className={_.input}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePassword}
          onBlur={() => setPasswordDirty(true)}
          disabled={isPending}
        />
        {!passwordError && passwordDirty &&
          <p className={_.error}>Сообщение об ошибке</p>}
      </div>

      <div className={_.wrapCheckbox}>
        <input
          className={_.checkbox}
          type="checkbox"
          id="save"
          name="save"
          checked={save}
          onChange={handleSave}
          disabled={isPending}
        />
        <label className={_.labelCheckbox} htmlFor="save">Сохранить пароль</label>
      </div>

      {isPending ? (
        <p className={_.pending}>Отправка...</p>
      ) : (
        <button
        className={_.submit}
        type="submit"
      >
        Войти
      </button>
      )}

      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={_.errorSubmit}>Сообщение об ошибке</p>
      )}
    </form>
  )
}