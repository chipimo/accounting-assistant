import { NEW_REG } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: "NEW_REG",
  user,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
