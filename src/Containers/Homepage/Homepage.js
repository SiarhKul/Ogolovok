
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { alertLogOut, alertError } from "../../Alerts/Alert.js";
import { auth, fs } from "../../Firebase/Firebase.js";
import { useHistory } from "react-router-dom";
import { setIsLogged } from "../../Redux/Redux-actions/actionsCreators.js";

import classes from "./Homepage.module.css";

import LinkKerchifMarker from "../../Componets/Navigation/LinkKerchifMarker.js";
import Kerchifmarkers from "../../Componets/Kerchifmarkers/Kerchifmarkers.js";
import Registration from "../../Componets/Registration/Registration.js";
import AdminAccess from "../../Componets/AdminAccess/AdminAccess.js";
import NoFoundPage from "../../Componets/NoFoundPage/NoFoundPage.js";
import ResultTable from "../../Componets/ResultTable/ResultTable.js";
import LinkWelder from "../../Componets/Navigation/LinkWelder.js";
import LinkAdmin from "../../Componets/Navigation/LinkAdmin.js";
import MainTable from "../../Componets/MainTable/MainTable.js";
import LinkHome from "../../Componets/Navigation/LinkHome.js";
import UserInfo from "../../Componets/UserInfo/UserInfo.js";
import Welder from "../../Componets/Welder/Welder.js";
import Login from "../../Componets/Login/Login.js";
import Home from "../../Componets/Home/Home.js";

export default function Homepage() {
   const history = useHistory();

   const isLogin = useSelector(state => state.isLogin);
   const [userInfoData, setUserInfoData] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);
   const [technologyOperation, setTechnologyOperation] = useState("");

   const redirectHome = () => history.push("./");
   const dispatch = useDispatch();
   const setIsLogin = useCallback((trueOrFalse) => dispatch(setIsLogged(trueOrFalse)));

   const onLogout = () => {
      auth.signOut()
         .then(() => alertLogOut())
         .catch(error => alertError(error.message));
      setIsLogin(false);
   };

   useEffect(() => {
      auth.onAuthStateChanged(user => {
         if (user) {
            user.getIdTokenResult()
               .then(idTokenResult => setIsAdmin(idTokenResult.claims.admin));

            if (isAdmin) {
               setUserInfoData(user.email);
               setIsLogin(true);
               setTechnologyOperation("администрирование");
            } else {
               setUserInfoData(user.email);
               fs.collection("users")
                  .doc(user.uid)
                  .get()
                  .then(snapshot => {

                     setIsLogin(true);

                     switch (snapshot.data().select) {
                        case "Сварка":
                           setTechnologyOperation("сварка");
                           return;
                        case "Разметка косынок":
                           setTechnologyOperation("разметка косынок");
                           return;
                        default:
                           setTechnologyOperation("администрирование");
                           return;
                     }
                  })
                  .catch(error => alertError(error.message));
            }
         } else {
            redirectHome();
         }
      });
   }, []);
   console.log();
   return (
      <div>
         <nav className={`navbar navbar-expand-md navbar-light bg-info ${classes.navigation}`}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
               aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse navcolor" id="navbarTogglerDemo03">
               <div className="container">
                  <div className="row">
                     <a className="navbar-brand text-light" href="/#">JD Company</a>
                     <ul className="navbar-nav ml-auto mt-2 mt-md-0">
                        {!isLogin && <LinkHome />}
                        {technologyOperation === "сварка" && isLogin
                           && <LinkWelder onLogout={onLogout} />
                        }
                        {technologyOperation === "разметка косынок" && isLogin
                           && <LinkKerchifMarker onLogout={onLogout} />
                        }
                        {technologyOperation === "администрирование" && isLogin
                           && <LinkAdmin onLogout={onLogout} />
                        }
                     </ul>
                  </div>
               </div>
            </div>
         </nav>

         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/kerchifmarkers" component={Kerchifmarkers} />
            <Route path="/maintable" component={MainTable} />
            <Route path="/registration" component={Registration} />
            <Route path="/adminaccess" component={AdminAccess} />
            <Route path="/userinfo" render={() => <UserInfo isadmin={isAdmin} userinfodata={userInfoData} />} />
            <Route path="/welder" component={Welder} />
            <Route path="/login" component={Login} />
            <Route path="/resulttable" component={ResultTable} />
            <Route component={NoFoundPage} />
         </Switch>
      </div >
   );
}