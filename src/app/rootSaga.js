import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import connectPage from '../containers/ConnectPage/saga';
import homePage from '../containers/Homepage/saga';

function* rootSaga() {
  yield all(
    [
      fork(connectPage),
      fork(homePage),
    ]
  );
}

const sagaMiddleware = createSagaMiddleware()

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
}
export default sagaMiddleware;
