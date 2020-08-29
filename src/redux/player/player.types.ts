import { Player } from "../../types/player";

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export interface PlayerState {
  players: Player[]
}

interface AddPlayerAction {
  type: typeof ADD_PLAYER;
  payload: Omit<Player, "id">
}

interface RemovePlayerAction {
  type: typeof REMOVE_PLAYER;
  payload: Player
}

export type PlayerActionTypes = AddPlayerAction | RemovePlayerAction;