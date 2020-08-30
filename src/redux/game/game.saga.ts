import PouchDB from 'pouchdb';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { addGameAction, removeGameAction, fetchGameAction } from './game.actions';
import { GameDoc } from '../../types/game';
;
const fetchGameFromDb = () => {
  const db = new PouchDB('game');
  return db.allDocs({ include_docs: true }).then((data) => data.rows.map(row => row.doc));
}

function* fetchGameSaga(): Generator {
  const db = new PouchDB('game');
  const docs: Array<GameDoc> = (yield call(fetchGameFromDb)) as Array<GameDoc>;
  yield put(fetchGameAction.success(docs))
}

function* addGameSaga(action: ReturnType<typeof addGameAction.request>): Generator {
  const db = new PouchDB('game');
  try { 
    yield db.post(action.payload).then((res) => res.id);
    yield put(fetchGameAction.request());
  } catch(e) {
    yield put(fetchGameAction.failure(new Error('fail')));
  }
}

function* removeGameSaga(action: ReturnType<typeof removeGameAction.request>): Generator {
  const db = new PouchDB('game');
  const doc: any = yield db.get(action.payload._id).then((res) => res);
  const isOk = yield db.remove(doc).then((res) => res.ok);
  yield put(fetchGameAction.request());
}

export function* GameSaga(){
  yield all([
    takeEvery(fetchGameAction.request, fetchGameSaga),
    takeEvery(addGameAction.request, addGameSaga),
    takeEvery(removeGameAction.request, removeGameSaga)
  ]);
}