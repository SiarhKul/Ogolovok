import React from "react";
import { NavLink } from "react-router-dom";

const LinkHome = () => {
   return (
      <>
         <li className="nav-item" >
            <NavLink className="nav-link text-light" to="/">Home </NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link text-light" to="/login">Login</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/registration" >Registration</NavLink>
         </li>

      </>
   );
};

export default LinkHome;
