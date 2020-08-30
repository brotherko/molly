import { fetchPlayerAction } from './player.actions';
import { PlayerDoc } from '../../types/player';
import { createReducer } from 'typesafe-actions';


export type PlayerState = {
  players: PlayerDoc[];
}
const initalState: PlayerState = {
  players: []
};

export const playerReducer = 
  createReducer(initalState)
  .handleAction([fetchPlayerAction.success], 
    (state, action) => ({ players: action.payload }))
