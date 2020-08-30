import { PlayerSaga } from './player/player.saga';
import { BookSaga } from './book/book.saga';
import { fork } from 'redux-saga/effects';
export default function* rootSaga() {
  yield fork(PlayerSaga)
  yield fork(BookSaga)
}