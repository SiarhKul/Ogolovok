import React from "react";
import { NavLink } from "react-router-dom";

const LinkKerchifMarker = ({ onLogout }) => {
   return (
      <>
         <li className="nav-item" >
            <NavLink className="nav-link text-light" to="/">Home <span className="sr-only">(current)</span></NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="kerchifmarkers">Kerchifmarkers</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link text-light" to="/logout" onClick={onLogout}>Logout</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/userinfo" >User info</NavLink>
         </li>
      </>
   );
};

export default LinkKerchifMarker;