import { ADD_PLAYER, PlayerActionTypes, REMOVE_PLAYER } from "./player.types";
import { Player } from "../../types/player";

export function addPlayer(player: Omit<Player, "id">): PlayerActionTypes {
  return {
    type: ADD_PLAYER,
    payload: player
  }
}

export function removePlayer(player: Player): PlayerActionTypes {
  return {
    type: REMOVE_PLAYER,
    payload: player
  }
}