import React from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { alertRegistration, alertError } from "../../Alerts/Alert.js";
import { auth, fs } from "../../Firebase/Firebase.js";
import classes from "./Registration.module.css";
import { Redirect } from "react-router-dom";
import { setIsLogged } from "../../Redux/Redux-actions/actionsCreators.js";

export default function Registration() {
   const isLogin = useSelector(state => state.isLogin);
   console.log(isLogin);
   const { register, handleSubmit, errors, getValues } = useForm();
   const dispatch = useDispatch();
   const setIsLogin = useCallback((trueOrFalse) => {
      dispatch(setIsLogged(trueOrFalse));
   });

   // const [isLogin, setIsLogin] = useState(false)

   const onSubmint = dataUserRegistration => {
      auth.createUserWithEmailAndPassword(dataUserRegistration.email, dataUserRegistration.password)
         .then(dataUserDataBase => {

            return fs.collection("users")
               .doc(dataUserDataBase.user.uid)
               .set({
                  email: dataUserRegistration.email,
                  password: dataUserRegistration.password,
                  repeatPassword: dataUserRegistration.repeatPassword,
                  select: dataUserRegistration.select,
                  userName: dataUserRegistration.userName,
                  userNickName: dataUserRegistration.userNickName,
                  userPatronymic: dataUserRegistration.userPatronymic,
                  userSurname: dataUserRegistration.userSurname,
               })
               .catch(error => alertError(error.message));

         })
         .then(() => {
            alertRegistration();
            setIsLogin(true);
         })
         .catch(error => alertError(error.message));
   };

   return (
      <div>
         <div className="container">
            <div className="row justify-content-md-center">
               <div className="col col-md-10 col-lg-8">
                  <form
                     action=""
                     method="post"
                     className=" m-auto  border border-info  p-5  m-5 rounded"
                     onSubmit={handleSubmit(onSubmint)}>

                     <h2>Registration</h2>

                     <div className="form-group">
                        <input type="text"
                           name="userNickName"
                           className="form-control"
                           placeholder="Имя пользователя"
                           ref={register({ required: true, minLength: 2 })} />
                        {errors.userNickName && <p className={classes.error} >Минимальна длина 2 символов</p>}

                     </div>

                     <div className="form-group">
                        <input
                           type="password"
                           name="password"
                           className="form-control"
                           placeholder="Пароль"
                           ref={register({
                              required: "Заполните поле",
                              minLength: { value: 6, message: "Минимальная длина 6 символов" }
                           })}
                        />
                        {errors.password && <p className={classes.error}>{errors.password.message}</p>}
                     </div>

                     <div className="form-group">
                        <input
                           type="password"
                           name="repeatPassword"
                           className="form-control"
                           placeholder="Повторите пароль"
                           ref={register({
                              validate: value =>
                                 value === getValues("password") || <span >Поля пароля не совпадают</span>,
                              required: "Заполните поле",
                              minLength: { value: 6, message: "Минимальная длина 6 символов" }
                           })}
                        />

                        {errors.repeatPassword && <p className={classes.error} >{errors.repeatPassword.message}</p>}


                     </div>

                     <div className="form-group">
                        <input
                           type="email"
                           className="form-control"
                           name="email"
                           placeholder="E-mail"
                           ref={register({
                              required: "Заполните поле",
                              pattern: {
                                 value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                 message: "Не подходящая электронная почта"
                              }
                           })}
                        />
                        {errors.email && <p className={classes.error} >{errors.email.message}</p>}
                     </div>

                     <div className="form-group">
                        <input
                           type="text"
                           name="userName"
                           className="form-control"
                           placeholder="Имя"
                           ref={register({ required: true })} />
                        {errors.userName && <p className={classes.error}>Минимальна длинна 2 символов</p>}

                     </div>

                     <div className="form-group">
                        <input
                           type="text"
                           name="userSurname"
                           className="form-control"
                           placeholder="Фамилия"
                           ref={register({ required: true })}
                        />
                        {errors.userSurname && <p className={classes.error}>Минимальна длинна 2 символов</p>}

                     </div>

                     <div className="form-group ">
                        <input
                           type="text"
                           name="userPatronymic"
                           className="form-control"
                           placeholder="Отчество"
                           ref={register({ required: true })} />
                        {errors.userPatronymic && <p className={classes.error}>Минимальна длинна 2 символов</p>}

                     </div>

                     <div className="form-group">
                        <select className="form-control" name="select" ref={register({ required: true })}>
                           <option value="">Выберете операцию</option>
                           <option value="Сварка">Сварка</option>
                           <option value="Разметка косынок">Разметка косынок</option>
                           <option value="администрирование">Администрирование</option>

                        </select>
                        {errors.select && <p className={classes.error}>Выберете операцию</p>}

                     </div>

                     <button
                        type="submit"
                        className="btn btn-primary btn-block "
                     >Registration
                     </button>
                  </form>
               </div>
            </div>
         </div>
         { isLogin && <Redirect to='/' />}
      </div>
   );
}