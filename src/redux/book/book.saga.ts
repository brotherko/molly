import PouchDB from 'pouchdb';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { addBookAction, removeBookAction, fetchBookAction } from './book.actions';
import { BookDoc } from '../../types/book';
;
const fetchBookFromDb = () => {
  const db = new PouchDB('book');
  return db.allDocs({ include_docs: true }).then((data) => data.rows.map(row => row.doc));
}

function* fetchBookSaga(): Generator {
  const db = new PouchDB('book');
  const docs: Array<BookDoc> = (yield call(fetchBookFromDb)) as Array<BookDoc>;
  yield put(fetchBookAction.success(docs))
}

function* addBookSaga(action: ReturnType<typeof addBookAction.request>): Generator {
  const db = new PouchDB('book');
  try { 
    yield db.post(action.payload).then((res) => res.id);
    yield put(fetchBookAction.request());
  } catch(e) {
    yield put(fetchBookAction.failure(new Error('fail')));
  }
}

function* removeBookSaga(action: ReturnType<typeof removeBookAction.request>): Generator {
  const db = new PouchDB('book');
  const doc: any = yield db.get(action.payload._id).then((res) => res);
  const isOk = yield db.remove(doc).then((res) => res.ok);
  yield put(fetchBookAction.request());
}

export function* BookSaga(){
  yield all([
    takeEvery(fetchBookAction.request, fetchBookSaga),
    takeEvery(addBookAction.request, addBookSaga),
    takeEvery(removeBookAction.request, removeBookSaga)
  ]);
}