import { createAsyncAction } from 'typesafe-actions';
import { Book, BookDoc } from "../../types/book";
import { DocMeta } from '../../types/db';

const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
const ADD_BOOK_SUCCEEDED = 'ADD_BOOK_SUCCEEDED';
const ADD_BOOK_FAILED = 'ADD_BOOK_FAILED';

const REMOVE_BOOK_REQUEST = 'REMOVE_BOOK_REQUEST';
const REMOVE_BOOK_SUCCEEDED = 'REMOVE_BOOK_SUCCEEDED';
const REMOVE_BOOK_FAILED = 'REMOVE_BOOK_FAILED';

const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
const FETCH_BOOK_SUCCEEDED = 'FETCH_BOOK_SUCCEEDED';
const FETCH_BOOK_FAILED = 'FETCH_BOOK_FAILED';

export const fetchBookAction = createAsyncAction(
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCEEDED,
  FETCH_BOOK_FAILED
)<undefined, BookDoc[], Error>();

export const addBookAction = createAsyncAction(
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCEEDED,
  ADD_BOOK_FAILED
)<Book, undefined, Error>();

export const removeBookAction = createAsyncAction(
  REMOVE_BOOK_REQUEST,
  REMOVE_BOOK_SUCCEEDED,
  REMOVE_BOOK_FAILED
)<BookDoc, undefined, Error>();