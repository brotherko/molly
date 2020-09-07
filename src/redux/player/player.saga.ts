import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addPlayerAction, removePlayerAction, fetchPlayerAction } from './player.actions';
import { Player, PlayerDoc } from '../../types/player';
import { v4 as uuid } from 'uuid';
import Database from '../../db';

const fetchPlayerFromDb = async () => {
  const db = await Database.get();
  const q = db.players.find();
  const docs = await q.exec();
  return docs.map((doc) => ({
    ref: doc,
    ...doc.toJSON(),
  }));
}

const addPlayerToDb = async (payload: Player): Promise<any> => {
  const db = await Database.get();
  try{
    const res = await db.players.insert(payload)
    return res
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}

const removePlayerFromDb = async (payload: PlayerDoc) => {
  try{
    await payload.ref.remove();
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}

function* fetchPlayerSaga(action: ReturnType<typeof fetchPlayerAction.request>): Generator {
  const docs: PlayerDoc[] = (yield call(fetchPlayerFromDb)) as PlayerDoc[];
  yield put(fetchPlayerAction.success(docs))
}

function* addPlayerSaga(action: ReturnType<typeof addPlayerAction.request>): Generator {
  try { 
    yield call(addPlayerToDb, {...action.payload, id: uuid(), createdAt: new Date().toISOString()})
    yield put(fetchPlayerAction.request());
  } catch(e) {
    yield put(fetchPlayerAction.failure(new Error('fail')));
  }
}

function* removePlayerSaga(action: ReturnType<typeof removePlayerAction.request>): Generator {
  yield call(removePlayerFromDb, action.payload);
  yield put(fetchPlayerAction.request());
}

export function* PlayerSaga(){
  yield all([
    takeLatest(fetchPlayerAction.request, fetchPlayerSaga),
    takeEvery(addPlayerAction.request, addPlayerSaga),
    takeEvery(removePlayerAction.request, removePlayerSaga)
  ]);
}