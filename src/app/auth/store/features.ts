import { createFeature, createReducer, on } from '@ngrx/store';
import { registerActions, loginActions } from './registerActiongroup';
import { initialState } from '../types/authState';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    on(registerActions.register, (state, { user }) => ({
      ...state,
      user: user,
    })),

    on(loginActions.login, (state, { username, password }) => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (
        storedUser.username === username &&
        storedUser.password === password
      ) {
        return { ...state, user: storedUser };
      }
      return state;
    }),

    on(loginActions.logout, (state) => ({
      ...state,
      user: null,
    }))
  ),
});
