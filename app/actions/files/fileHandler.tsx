
export const userLoggedIn = (user, type) => ({
  type: type,
  user
});

export const fileHander = (action, fileEvent) => dispatch =>
  dispatch(userLoggedIn(action, fileEvent));