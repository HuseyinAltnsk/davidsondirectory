// Actions
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const REGISTER = "REGISTER";

export const registerAction = (values) => {
  return {
    type: REGISTER,
    values
  }
};

export const getCurrentUserAction = (user) => {
  return {
    type: GET_CURRENT_USER,
    user
  }
};

// THUNKS
export const getCurrentUser = () => {
  return dispatch => {
    return fetch('/user/current', {credentials: "include"})
      .then(result => result.json())
      .then(user => {
        dispatch(getCurrentUserAction(user));
      })
  };
};

export const register = (values, _id) => {
  const {} = values;
  let info;
  return (dispatch) => {
    return fetch("/user", {
      method: "POST",
      body: JSON.stringify({
        values: info,
        _id
      }),
      headers: { "content-type": "application/json" },
      credentials: "include"
    }).then(() => dispatch(registerAction(values)));
  };
};
