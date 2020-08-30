import { PlayerDoc } from './../../types/player';
import { createAsyncAction } from 'typesafe-actions';
import { Player } from "../../types/player";

const ADD_PLAYER_REQUEST = 'ADD_PLAYER_REQUEST';
const ADD_PLAYER_SUCCEEDED = 'ADD_PLAYER_SUCCEEDED';
const ADD_PLAYER_FAILED = 'ADD_PLAYER_FAILED';

const REMOVE_PLAYER_REQUEST = 'REMOVE_PLAYER_REQUEST';
const REMOVE_PLAYER_SUCCEEDED = 'REMOVE_PLAYER_SUCCEEDED';
const REMOVE_PLAYER_FAILED = 'REMOVE_PLAYER_FAILED';

const FETCH_PLAYER_REQUEST = 'FETCH_PLAYER_REQUEST';
const FETCH_PLAYER_SUCCEEDED = 'FETCH_PLAYER_SUCCEEDED';
const FETCH_PLAYER_FAILED = 'FETCH_PLAYER_FAILED';

export const fetchPlayerAction = createAsyncAction(
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCEEDED,
  FETCH_PLAYER_FAILED
)<undefined, Array<PlayerDoc>, Error>();

export const addPlayerAction = createAsyncAction(
  ADD_PLAYER_REQUEST,
  ADD_PLAYER_SUCCEEDED,
  ADD_PLAYER_FAILED
)<Player, undefined, Error>();

export const removePlayerAction = createAsyncAction(
  REMOVE_PLAYER_REQUEST,
  REMOVE_PLAYER_SUCCEEDED,
  REMOVE_PLAYER_FAILED
)<PlayerDoc, undefined, Error>();