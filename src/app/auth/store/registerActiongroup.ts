import { userInterface } from '../types/userInterface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const registerActions = createActionGroup({
  source: '[Auth] Register',
  events: {
    register: props<{ user: userInterface }>(),
    registerSuccess: props<{ user: userInterface }>(),
  },
});

export const loginActions = createActionGroup({
  source: '[Auth] Login',
  events: {
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ user: userInterface }>(),
    logout: emptyProps(),
  },
});
