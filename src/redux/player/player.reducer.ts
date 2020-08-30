import { addPlayerAction, removePlayerAction } from './player.actions';
import { Player } from '../../types/player';
import { createReducer } from 'typesafe-actions';

export type PlayerState = {
  players: Player[];
}
const initalState: PlayerState = {
  players: []
};

export const playerReducer = 
  createReducer(initalState)
  .handleAction(addPlayerAction.success, 
    (state, action) => ({ players: [...state.players, { ...action.payload }] }))
  .handleAction(removePlayerAction.success, 
    (state, action) => ({ players: state.players.filter(player => player !== action.payload ) }));
