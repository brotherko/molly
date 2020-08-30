import { combineReducers } from 'redux';

import { PlayerState, playerReducer } from './player/player.reducer';

export type RootState = {
	player: PlayerState;
}

const rootReducer = combineReducers({
	player: playerReducer,
});

export default rootReducer;