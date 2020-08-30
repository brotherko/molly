import { GameDoc } from './../../types/game';
import { fetchGameAction } from './game.actions';
import { createReducer } from 'typesafe-actions';


export type GameState = {
  games: Array<GameDoc>;
}
const initalState: GameState = {
  games: []
};


export const gameReducer = 
  createReducer(initalState)
  .handleAction([fetchGameAction.success], 
    (state, action) => ({ games: action.payload }))
