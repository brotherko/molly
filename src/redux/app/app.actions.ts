import { createAction } from "typesafe-actions";

export const INIT_APP_DATA = 'INIT_APP_DATA';

export const initAppDataAction = createAction(INIT_APP_DATA);