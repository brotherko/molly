import { all, put, takeLatest, putResolve, delay } from "redux-saga/effects";
import { fetchPlayerAction } from "../player/player.actions";
import { fetchBookAction } from "../book/book.actions";
import { INIT_APP_DATA } from "./app.actions";

function* initAppData(){
  yield put(fetchPlayerAction.request());
  yield put(fetchBookAction.request());
}
export default function* AppSaga() {
  yield all([
    takeLatest(INIT_APP_DATA, initAppData)
  ]);
}