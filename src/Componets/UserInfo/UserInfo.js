import React from "react";

const UserInfo = ({ userinfodata, isadmin }) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-md-8 col-lg-6 justify-content-center">
          <div className=" m-auto text-center border border-info p-5 m-5 rounded" >
            <p>Пользователь:{userinfodata}</p>
            {isadmin && <p>Статус:Администратор</p>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserInfo;

