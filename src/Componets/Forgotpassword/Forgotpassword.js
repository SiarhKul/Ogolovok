import React from 'react'

export default function Forgotpassword() {
   return (
      <>
         <div className="container">
            <div className="row justify-content-md-center">
               <div className="col col-md-8 col-lg-6 justify-content-center">
                  <form method="post" className="text-center border border-info p-5 m-5 rounded">
                     <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>

                     <div className="form-group">
                        <input type="text" name="user-name" className="form-control" placeholder="Введите имя пользователя" />
                     </div>

                     <div className="form-group">
                        <input
                           type="email"
                           className="form-control"
                           name="email"
                           placeholder="Введите E-mail резервный"
                        />
                     </div>

                     <button type="submit" className="btn btn-info btn-block " />
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}
