import PouchDB from 'pouchdb';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { addPlayerAction } from './player.actions';
;
const fetchPlayerFromDb = () => {
  const db = new PouchDB('player');
  return db.allDocs().then((data) => data);
}

function* addPlayer(action: ReturnType<typeof addPlayerAction.request>): Generator {
  console.log('in add player saga');
  const db = new PouchDB('player');
  const _id: string = (yield db.post(action.payload).then((res) => res.id)) as string;
  yield put(addPlayerAction.success({...action.payload, _id}))
}

// function* fetchPlayer() {
//   const res = yield call(fetchPlayerFromDb);
//   yield put({ type: FETCH_PLAYER_SUCCEEDED, payload: res })
// }

export function* PlayerSaga(){
  yield all([
    // takeEvery(FETCH_PLAYER_START, fetchPlayer),
    takeEvery(addPlayerAction.request, addPlayer)
  ]);
}