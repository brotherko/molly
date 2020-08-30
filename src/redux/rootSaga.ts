import { PlayerSaga } from './player/player.saga';
import { GameSaga } from './game/game.saga';
import { fork } from 'redux-saga/effects';
export default function* rootSaga() {
  yield fork(PlayerSaga)
  yield fork(GameSaga)
}