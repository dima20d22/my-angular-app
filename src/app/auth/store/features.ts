import { createFeature, createReducer, on } from '@ngrx/store';
import { registerActions, loginActions } from './actionGroups';
import { initialState } from '../types/authState';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    on(registerActions.register, (state, { user }) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find((u: any) => u.username === user.username);

      if (existingUser) {
        return {
          ...state,
          loading: false,
          errorMessage: 'Name is already taken',
        };
      }

      const updatedUsers = [...users, user];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return {
        ...state,
        user: user,
        loading: false,
        errorMessage: null,
      };
    }),

    on(registerActions.registerFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorMessage: error,
    })),

    on(loginActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorMessage: error,
    })),

    on(loginActions.login, (state, { username, password }) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (existingUser) {
        return {
          ...state,
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
