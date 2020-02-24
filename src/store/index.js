// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducer";
import createSagaMiddleware from "redux-saga";
import saga from "../saga";

const sagaMiddleware = createSagaMiddleware();
// export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
export const store = configureStore({ reducer, middleware: [sagaMiddleware] });
sagaMiddleware.run(saga);
