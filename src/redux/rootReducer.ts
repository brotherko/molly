import { combineReducers } from 'redux';

import { playerReducer } from './player/player.reducer';
import { PlayerState } from './player/player.types';

export type RootState = {
	player: PlayerState;
}

const rootReducer = combineReducers({
	player: playerReducer,
});

export default rootReducer;