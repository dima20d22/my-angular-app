import { userInterface } from '../types/userInterface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const registerActions = createActionGroup({
  source: '[Auth] Register',
  events: {
    register: props<{ user: userInterface }>(),
    registerFailure: props<{ error: string }>(),
  },
});

export const loginActions = createActionGroup({
  source: '[Auth] Login',
  events: {
    login: props<{ user: userInterface }>(),
    loginFailure: props<{ error: string }>(),
  },
});
