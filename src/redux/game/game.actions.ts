import { createAsyncAction } from 'typesafe-actions';
import { Game, GameDoc } from "../../types/game";
import { DocMeta } from '../../types/db';

const ADD_GAME_REQUEST = 'ADD_GAME_REQUEST';
const ADD_GAME_SUCCEEDED = 'ADD_GAME_SUCCEEDED';
const ADD_GAME_FAILED = 'ADD_GAME_FAILED';

const REMOVE_GAME_REQUEST = 'REMOVE_GAME_REQUEST';
const REMOVE_GAME_SUCCEEDED = 'REMOVE_GAME_SUCCEEDED';
const REMOVE_GAME_FAILED = 'REMOVE_GAME_FAILED';

const FETCH_GAME_REQUEST = 'FETCH_GAME_REQUEST';
const FETCH_GAME_SUCCEEDED = 'FETCH_GAME_SUCCEEDED';
const FETCH_GAME_FAILED = 'FETCH_GAME_FAILED';

export const fetchGameAction = createAsyncAction(
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCEEDED,
  FETCH_GAME_FAILED
)<undefined, GameDoc[], Error>();

export const addGameAction = createAsyncAction(
  ADD_GAME_REQUEST,
  ADD_GAME_SUCCEEDED,
  ADD_GAME_FAILED
)<Game, undefined, Error>();

export const removeGameAction = createAsyncAction(
  REMOVE_GAME_REQUEST,
  REMOVE_GAME_SUCCEEDED,
  REMOVE_GAME_FAILED
)<GameDoc, undefined, Error>();