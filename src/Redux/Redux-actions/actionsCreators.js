import { db, fs, auth } from "../../Firebase/Firebase.js";
import { alertError } from "../../Alerts/Alert.js";

import {
  SET_ISLOGIN,
  ADD_TO_TABLE,
  SEND_DATA_TO_SERVER,
  UPDATE_DATA_TO_SERVER,
  FETCH_DATA_FROM_SERVER,
  SET_POSITION,
} from "../Redux-constants/constants.js";

export const setIsLogged = (trueOrFalse) => {
  return { type: SET_ISLOGIN, payload: trueOrFalse };
};

export const addToTable = (fistRowData) => {
  return { type: ADD_TO_TABLE, payload: fistRowData };
};

export const setPosition = (position) => {
  return (dispatch) => {
    dispatch({ type: SET_POSITION, payload: position });
  };
};

export const sendDataToServer = (position, rowsData) => {
  return (dispatch) => {
    db.ref()
      .child("kerchif")
      .child(position)
      .set(rowsData)
      .then(() => {
        dispatch({ type: SEND_DATA_TO_SERVER, payload: rowsData });
      })
      .catch((error) => alertError(error.message));
  };
};

export const updateDataToServer = (rowsData) => {
  return (dispatch) => {
    db.ref("kerchif")
      .orderByKey()
      .endAt("kerchif")
      .once("child_added", (snapshot) => {
        db.ref(`kerchif/${snapshot.key}`)
          .set(rowsData)
          .then(() => {
            dispatch({ type: UPDATE_DATA_TO_SERVER, payload: rowsData });
          });
      })
      .catch((error) => alertError(error.message));
  };
};

export const fetchDataFormServer = () => {
  return (dispatch) => {
    db.ref("kerchif")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          dispatch({
            type: FETCH_DATA_FROM_SERVER,
            payload: childSnapshot.val(),
          });
          dispatch({ type: SET_POSITION, payload: childSnapshot.key });
        });
      })
      .catch((error) => alertError(error.message));
  };
};

export const fixWelderData = (merged) => {
  return () => {
    db.ref("kerchif")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((childChildSnapshot) =>
            childChildSnapshot.val().id === merged.id
              ? db
                .ref(`kerchif/${childSnapshot.key}/${childChildSnapshot.key}`)
                .update(merged)
              : null
          );
        });
      })
      .catch((error) => alertError(error.message));
  };
};

export const fetchCustomUserData = (parametersPile, dateAndTime, id) => {
  return (dispatch) => {
    const currentUserId = auth.currentUser.uid;
    fs.collection("users")
      .doc(currentUserId)
      .get()
      .then((snapshot) => {
        const currentUserData = snapshot.data();
        const mergeCurrentUserData = parametersPile.map((paramPile) => {
          return paramPile.id === id
            ? {
              ...paramPile,
              ...currentUserData,
              moment: dateAndTime,
              disabled: true,
            }
            : { ...paramPile };
        });
        dispatch(addToTable(mergeCurrentUserData));
        dispatch(updateDataToServer(mergeCurrentUserData));
      })
      .catch((error) => alertError(error.message));
  };
};
