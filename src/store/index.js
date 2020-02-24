import { configureStore } from "@reduxjs/toolkit";
import reducer from "../app/rootReducer";
import sagaMiddleware, { startSaga } from "../app/rootSaga";

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});
startSaga()
export default store;
