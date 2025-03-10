import { createFeature, createReducer, on } from '@ngrx/store';
import { registerActions, loginActions } from './actionGroups';
import { initialState } from '../types/authState';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    on(registerActions.register, (state, { user }) => ({
      ...state,
      user: user,
      errorMessage: null,
    })),

    on(loginActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorMessage: error,
    })),

    on(loginActions.login, (state, { username, password }) => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (
        storedUser.username === username &&
        storedUser.password === password
      ) {
        return {
          ...state,
          user: storedUser,
          loading: false,
          errorMessage: null,
        };
      } else {
        return {
          ...state,
          user: null,
          loading: false,
          errorMessage: 'user not found',
        };
      }
    })
  ),
});
