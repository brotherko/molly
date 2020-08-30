import { PlayerSaga } from './player/player.saga';
import { fork } from 'redux-saga/effects';
export default function* rootSaga() {
  yield fork(PlayerSaga)
}