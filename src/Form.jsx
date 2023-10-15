import _ from './Form.module.css';
import { useForm } from 'react-hook-form';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  // console.log(errors);
  return (
    <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor="email">
          Email
        </label>
        <input
          className={_.input}
          type="text"
          id="email"
          aria-invalid={!!errors.email}
          {...register('email', {
            // required: 'Введите email'
            required: {
              value: true,
              message: 'Введите email',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Неверный email',
            }
          })}
        />
        {
          errors.email && 
            <p className={_.error}>{errors.email.message}</p>
        }
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor="password">Пароль</label>
        <input
          className={_.input}
          type="password"
          id="password"
          aria-invalid={!!errors.password}
          {...register('password', {
            required: {
              value: true,
              message: 'Введите пароль',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'Должен содержать 6 символов: строчную и прописную букву, цифру и спецсимвол',
            }
          })}
        />
        {
          errors.password && 
            <p className={_.error}>{errors.password.message}</p>
        }
      </div>

      <div className={_.wrapCheckbox}>
        <input
          className={_.checkbox}
          type="checkbox"
          id="save"
          {...register('save', {
            required: {
              value: true,
              message: 'Необходимо согласиться',
            }
          })}
        />
        <label className={_.labelCheckbox} htmlFor="save">Согласен</label>
        {
          errors.save && 
            <p className={_.error}>{errors.save.message}</p>
        }
      </div>

        <button
        className={_.submit}
        type="submit"
      >
        Войти
      </button>


    </form>
  )
}