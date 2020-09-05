import { fetchBookAction } from './book.actions';
import { createReducer } from 'typesafe-actions';
import { BookDoc } from '../../types/book';


export type BookState = {
  books: BookDoc[];
}
const initalState: BookState = {
  books: []
};


export const bookReducer = 
  createReducer(initalState)
  .handleAction([fetchBookAction.success], 
    (state, action) => ({ books: action.payload }))
