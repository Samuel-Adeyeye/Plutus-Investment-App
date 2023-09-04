import React from "react";
// import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import reducer from "./redux/reducers.ts";
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
     reducer: reducer,
     middleware: [thunk]
   });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Provider store={store} >
     <App />
    </Provider>
  </React.StrictMode>
);
