import React from "react";
import classes from "./welder.module.css";

const WelderButton = (props) => {
   const {
      disabled,
      id,
      pile,
      marksOM,
      userSurname,
      moment,
      onWelded
   } = props;

   return (
      <button
         disabled={disabled}
         className={`shadow-lg btn btn-info ${classes.clearPadding}`}
         onClick={(e) => { onWelded(e, id); }}
         key={id}
      >
         <span>Свая:{pile}/</span>
         <span>{marksOM}</span>
         <span>{userSurname}</span>
         <p className={classes.clearMargin}>{moment}</p>
      </button>
   );
};

export default WelderButton;
