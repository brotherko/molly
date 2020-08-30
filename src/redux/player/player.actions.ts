import { createAsyncAction } from 'typesafe-actions';
import { Player } from "../../types/player";

const ADD_PLAYER_START = 'ADD_PLAYER_START';
const ADD_PLAYER_SUCCEEDED = 'ADD_PLAYER_SUCCEEDED';
const ADD_PLAYER_FAILED = 'ADD_PLAYER_FAILED';

const REMOVE_PLAYER_START = 'REMOVE_PLAYER_START';
const REMOVE_PLAYER_SUCCEEDED = 'REMOVE_PLAYER_SUCCEEDED';
const REMOVE_PLAYER_FAILED = 'REMOVE_PLAYER_FAILED';

const FETCH_PLAYER_START = 'FETCH_PLAYER_START';
const FETCH_PLAYER_SUCCEEDED = 'FETCH_PLAYER_SUCCEEDED';
const FETCH_PLAYER_FAILED = 'FETCH_PLAYER_FAILED';


export const addPlayerAction = createAsyncAction(
  ADD_PLAYER_START,
  ADD_PLAYER_SUCCEEDED,
  ADD_PLAYER_FAILED
)<Omit<Player, '_id'>, Player, Error>();

export const removePlayerAction = createAsyncAction(
  REMOVE_PLAYER_START,
  REMOVE_PLAYER_SUCCEEDED,
  REMOVE_PLAYER_FAILED
)<Player, boolean, Error>();