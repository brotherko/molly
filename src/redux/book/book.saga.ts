import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addBookAction, removeBookAction, fetchBookAction } from './book.actions';
import { Book, BookDoc } from '../../types/book';
import { v4 as uuid } from 'uuid';
import Database from '../../db';

const fetchBookFromDb = async () => {
  const q = (await Database.get()).books.find();
  const results = await q.exec();
  return results;
}

const addBookToDb = async (payload: Book) => {
  const db = await Database.get();
  try{
    await db.books.insert(payload)
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}

const removeBookFromDb = async (payload: BookDoc) => {
  try{
    await payload.remove();
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}

function* fetchBookSaga(action: ReturnType<typeof fetchBookAction.request>): Generator {
  const docs: BookDoc[] = (yield call(fetchBookFromDb)) as BookDoc[];
  yield put(fetchBookAction.success(docs))
}

function* addBookSaga(action: ReturnType<typeof addBookAction.request>): Generator {
  try { 
    yield call(addBookToDb, {...action.payload, id: uuid(), createdAt: new Date().toISOString()})
    yield put(fetchBookAction.request());
  } catch(e) {
    yield put(fetchBookAction.failure(new Error('fail')));
  }
}

function* removeBookSaga(action: ReturnType<typeof removeBookAction.request>): Generator {
  yield call(removeBookFromDb, action.payload);
  yield put(fetchBookAction.request());
}

export function* BookSaga(){
  yield all([
    takeLatest(fetchBookAction.request, fetchBookSaga),
    takeEvery(addBookAction.request, addBookSaga),
    takeEvery(removeBookAction.request, removeBookSaga)
  ]);
}