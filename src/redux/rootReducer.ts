import { combineReducers } from 'redux';

import { PlayerState, playerReducer } from './player/player.reducer';
import { BookState, bookReducer } from './book/book.reducer';

export type RootState = {
	player: PlayerState;
	book: BookState;
}

const rootReducer = combineReducers({
	player: playerReducer,
	book: bookReducer,
});

export default rootReducer;