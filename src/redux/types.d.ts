import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./rootAction').default>;

  interface Types {
    RootAction: RootAction;
  }
}
