import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { alertError, alertSuccess } from "../../Alerts/Alert.js";
import { auth } from "../../Firebase/Firebase.js";
import { setIsLogged } from "../../Redux/Redux-actions/actionsCreators.js";
import classes from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const isLogin = useSelector(state => state.isLogin);
  const { register, handleSubmit, errors } = useForm();
  const routeChange = () => history.push("registration");
  const dispatch = useDispatch();
  const setIsLogin = useCallback((trueOrFalse) => {
    dispatch(setIsLogged(trueOrFalse));
  });

  const onSubmit = data => {
    auth.signInWithEmailAndPassword(data.email, data.userPassword)
      .then(() => {
        alertSuccess("Вы вошли в приложение");
        setIsLogin(true);
      })
      .catch(error => alertError(error.message));
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-md-8 col-lg-6 justify-content-center">
            <form
              method="post"
              className=" m-auto text-center border border-info p-5 m-5 rounded"
              onSubmit={handleSubmit(onSubmit)}
            >

              <h2>Войти в приложение</h2>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="E-mail"
                  ref={register({ required: true, minLength: 5 })} />
                {errors.email && <p className={classes.error}>Минимальна длинна 5 символов</p>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="userPassword"
                  className="form-control"
                  placeholder="Пароль"
                  ref={register({ required: true, minLength: 6 })} />
                {errors.userPassword && <p className={classes.error}> Минимальна длина 6 символов</p>}
              </div>

              <button
                className="btn btn-primary btn-block "
                type="submint"
              >Войти
              </button>
              <button
                type="button"
                className="btn btn-info btn-block "
                onClick={routeChange}>Регистрация</button>
            </form>
          </div>
        </div>
      </div>
      { isLogin && <Redirect to="/" />}
    </div>
  );
};
export default Login;