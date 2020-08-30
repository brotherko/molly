import PouchDB from 'pouchdb';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { addPlayerAction, removePlayerAction, fetchPlayerAction } from './player.actions';
;
const fetchPlayerFromDb = () => {
  const db = new PouchDB('player');
  return db.allDocs().then((data) => data);
}

function* fetchPlayerSaga(action: ReturnType<typeof fetchPlayerAction.request>): Generator {
  const db = new PouchDB('player');
  const docs: any = yield db.allDocs({ include_docs: true }).then((data) => data.rows.map(row => row.doc));
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
    takeEvery(fetchPlayerAction.request, fetchPlayerSaga),
    takeEvery(addPlayerAction.request, addPlayerSaga),
    takeEvery(removePlayerAction.request, removePlayerSaga)
  ]);
}