import { combineReducers } from 'redux';

import { PlayerState, playerReducer } from './player/player.reducer';
import { GameState, gameReducer } from './game/game.reducer';

export type RootState = {
	player: PlayerState;
	game: GameState;
}

const rootReducer = combineReducers({
	player: playerReducer,
	game: gameReducer,
});

export default rootReducer;