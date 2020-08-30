import { PlayerDoc } from './../../types/player';
import PouchDB from 'pouchdb';
import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addPlayerAction, removePlayerAction, fetchPlayerAction } from './player.actions';
import { Player } from '../../types/player';
;
const fetchPlayerFromDb = () => {
  const db = new PouchDB('player');
  return db.allDocs({ include_docs: true }).then((data) => data.rows.map(row => row.doc));
}

function* fetchPlayerSaga(action: ReturnType<typeof fetchPlayerAction.request>): Generator {
  const db = new PouchDB('player');
  const docs: PlayerDoc[] = (yield call(fetchPlayerFromDb)) as PlayerDoc[];
  yield put(fetchPlayerAction.success(docs))
}

function* addPlayerSaga(action: ReturnType<typeof addPlayerAction.request>): Generator {
  const db = new PouchDB('player');
  try { 
    yield db.post(action.payload).then((res) => res.id);
    yield put(fetchPlayerAction.request());
  } catch(e) {
    yield put(fetchPlayerAction.failure(new Error('fail')));
  }
}

function* removePlayerSaga(action: ReturnType<typeof removePlayerAction.request>): Generator {
  const db = new PouchDB('player');
  const doc: any = yield db.get(action.payload._id).then((res) => res);
  const isOk = yield db.remove(doc).then((res) => res.ok);
  yield put(fetchPlayerAction.request());
}

export function* PlayerSaga(){
  yield all([
    takeLatest(fetchPlayerAction.request, fetchPlayerSaga),
    takeEvery(addPlayerAction.request, addPlayerSaga),
    takeEvery(removePlayerAction.request, removePlayerSaga)
  ]);
}