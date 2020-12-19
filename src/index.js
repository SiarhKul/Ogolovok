import React from "react";
import ReactDOM from "react-dom";
import App from "./Componets/App";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import mainReducer from "./Redux/Redux-reducer/mainReducer.js";
import thunk from "redux-thunk";

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));

const applications = (
   <Provider store={store}>
      < BrowserRouter >
         <App />
      </ BrowserRouter>
   </Provider>
);

ReactDOM.render(applications, document.getElementById("root"));


