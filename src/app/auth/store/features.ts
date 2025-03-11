import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { registerActions, loginActions } from './actionGroups';
import { initialState } from '../types/authState';

export const selectAuthState = (state: { auth: any }) => state.auth;
export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
export const selectErrorMessage = createSelector(
  selectAuthState,
  (state) => state.errorMessage
);
export const selectUsers = createSelector(
  selectAuthState,
  (state) => state.users
);

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

    on(loginActions.login, (state, { user }) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const existingUser = users.find(
        (u: any) => u.username === user.username && u.password === user.password
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
