import { fetchBookAction } from './book.actions';
import { createReducer } from 'typesafe-actions';
import { BookDoc } from '../../types/book';


export type BookState = {
  books: BookDoc[];
  loading: boolean;
}
const initalState: BookState = {
  books: [],
  loading: true,
};


export const bookReducer = 
  createReducer(initalState)
  .handleAction([fetchBookAction.request], (state) => ({ ...state, loading: true }))
  .handleAction([fetchBookAction.success], 
    (state, action) => ({ books: action.payload, loading: false }))
