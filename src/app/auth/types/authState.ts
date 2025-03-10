import { userInterface } from './userInterface';

export interface AuthState {
  user: userInterface | null;
  errorMessage: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  errorMessage: null,
  loading: false,
};
