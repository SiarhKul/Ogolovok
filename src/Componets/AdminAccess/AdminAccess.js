import React from "react";
import { fc } from "../../Firebase/Firebase.js";
import { useForm } from "react-hook-form";
import { alertSuccess } from "../../Alerts/Alert.js";
import classes from "./AdminAccess.module.css";

const AdminAccess = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const addAdminRole = fc.httpsCallable("addAdminRole");
    addAdminRole({ email: data.email }).then(result => {
      alertSuccess(result.data.message);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-md-8 col-lg-6 justify-content-center">

            <form
              action=""
              method="post"
              className=" m-auto text-center border border-info p-5 m-5 rounded"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p>Предоставить административный доступ для пользователя:</p>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="E-mail"
                  ref={register({ required: true })}
                />
                {errors.email && <p className={classes.error}>Введите электронную почту</p>}
              </div>

              <button className="btn btn-primary btn-block " type="submit">Предоставить доступ</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};



export default AdminAccess;








