import { PlayerState, PlayerActionTypes, ADD_PLAYER, REMOVE_PLAYER } from './player.types';

const initalState: PlayerState = {
  players: []
};

export const playerReducer = (state = initalState, action: PlayerActionTypes): PlayerState => {
  switch(action.type) {
    case ADD_PLAYER:
      const newId = (state.players.length > 0) ? state.players.slice(-1)[0].id + 1 : 1;
      return { 
        players: [ ...state.players, { id: newId, ...action.payload } ]
      }
    case REMOVE_PLAYER:
      return { 
        players: state.players.filter(player => player.name !== action.payload.name)
      }
    default:
      return state
  }
}