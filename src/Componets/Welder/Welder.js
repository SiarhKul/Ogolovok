import React, { useState, useEffect } from "react";
import { alertError } from "../../Alerts/Alert.js";
import moment from "moment";
import WelderButton from "./WelderButton.js";
import { Wave } from "react-preloading-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFormServer, fetchCustomUserData } from "../../Redux/Redux-actions/actionsCreators.js";

export default function Welder() {
  const dateAndTime = moment().format("DD/MM/YYYY-HH:mm:ss");
  const [isLoaded, setIsLoaded] = useState(false);
  const parametersPile = useSelector(state => state.rowsData);
  const position = useSelector(state => state.position);
  const dispatch = useDispatch();

  const onWelded = (e, id) => {
    dispatch(fetchCustomUserData(parametersPile, dateAndTime, id));
  };

  useEffect(() => {
    const afterFetchDataFormServer = new Promise(() => dispatch(fetchDataFormServer()));
    afterFetchDataFormServer
      .then(setIsLoaded(true))
      .catch(error => alertError(error.message));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="p-2">Позиция:{position}</h2>
      </div>
      <div className="container">
        <div className="container-inner row  justify-content-center   border-info">
          <div className=" border-info p-2 mr-2 ">

            {isLoaded ? null : <Wave color="blue" />}

            {parametersPile.map(({ id, ...paramPile }) => {
              return (
                <WelderButton key={id}  {...paramPile} id={id} onWelded={onWelded} />
              );
            })}
          </div>
        </div>
      </div >
    </div >
  );
}

