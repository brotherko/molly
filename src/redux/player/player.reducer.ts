import { addPlayerAction, removePlayerAction, fetchPlayerAction } from './player.actions';
import { Player } from '../../types/player';
import { createReducer } from 'typesafe-actions';
import { DbMeta } from '../../types/db';


export type PlayerState = {
  players: Array<Player & DbMeta>;
}
const initalState: PlayerState = {
  players: []
};

export const playerReducer = 
  createReducer(initalState)
  .handleAction([fetchPlayerAction.success], 
    (state, action) => ({ players: action.payload }))
