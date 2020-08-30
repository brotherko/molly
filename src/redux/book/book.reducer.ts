import { BookDoc } from './../../types/book';
import { fetchBookAction } from './book.actions';
import { createReducer } from 'typesafe-actions';


export type BookState = {
  books: Array<BookDoc>;
}
const initalState: BookState = {
  books: []
};


export const bookReducer = 
  createReducer(initalState)
  .handleAction([fetchBookAction.success], 
    (state, action) => ({ books: action.payload }))
