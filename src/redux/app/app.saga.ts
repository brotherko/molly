import { all, put, takeLatest, call } from "redux-saga/effects";
import { fetchPlayerAction } from "../player/player.actions";
import { fetchBookAction } from "../book/book.actions";
import { INIT_APP_DATA } from "./app.actions";
import Database from "../../db";

const initDb = async () => {
  await Database.get();
}
function* initAppData(){
  yield call(initDb);
  yield put(fetchPlayerAction.request());
  yield put(fetchBookAction.request());
}
export default function* AppSaga() {
  yield all([
    takeLatest(INIT_APP_DATA, initAppData)
  ]);
}