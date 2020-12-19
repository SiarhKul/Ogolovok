import React from "react";
import { NavLink } from "react-router-dom";

const LinkAdmin = ({ onLogout }) => {
   return (
      <>
         <li className="nav-item" >
            <NavLink className="nav-link text-light" to="/">Home</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/maintable" >Maintable </NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/kerchifmarkers">Kerchifmarkers</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/welder">Welder</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link text-light" to="/logout" onClick={onLogout}>Logout</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/adminaccess" >Admin access</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/resulttable" >ResultTable</NavLink>
         </li>
         <li className="nav-item">
            <NavLink className="nav-link  text-light" to="/userinfo" >User info</NavLink>
         </li>
      </>
   );
};

export default LinkAdmin;
