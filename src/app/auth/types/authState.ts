import { userInterface } from './userInterface';

export interface AuthState {
  user: userInterface | null;
}

export const initialState: AuthState = {
  user: null,
};
