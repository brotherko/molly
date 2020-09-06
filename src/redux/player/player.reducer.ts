import { fetchPlayerAction } from './player.actions';
import { createReducer } from 'typesafe-actions';
import { PlayerDoc } from '../../types/player';


export type PlayerState = {
  players: PlayerDoc[];
  loading: boolean;
}
const initalState: PlayerState = {
  players: [],
  loading: true,

};

export const playerReducer = 
  createReducer(initalState)
  .handleAction([fetchPlayerAction.request], (state) => ({ ...state, loading: true }))
  .handleAction([fetchPlayerAction.success], 
    (state, action) => ({ players: action.payload, loading: false }))
