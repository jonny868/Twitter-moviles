const axios = require("axios").default;

const url = "http://10.0.0.115:3000/";

const catchError = async (err) => {
  /// Error
  if (err.response) {
    console.log(err.response.data.msg);
    return err.response;
    /// Error de mala conexion
  } else if (err.request) {
    // console.log(err.request)
    return {
      data: {
        msg: "No se ha contactado con el servidor, revise su conexion a internet y vuelva a intentarlo",
      },
    };
    /// Error inesperado
  } else {
    console.log("Error", err.message);
    return {
      data: { msg: "Ha ocurrido un error inesperado, intente nuevamente" },
    };
  }
};

export const loginUser = async (data) => {
  const { username, password } = data;
  let response;
  await axios
    .post(`${url}login`, {
      username,
      password,
    })
    .then((res) => {
      response = res;
    })
    .catch((err) => catchError(err));

  return response;
};

export const registerUser = async (data) => {
  const { username, password, email } = data;

  let response;
  await axios
    .post(`${url}register`, { username, email, password })
    .then((res) => (response = res))
    .catch((err) => catchError(err));
};

export const addNewTweet = async (data) => {
  let response;
  const { userId, content } = data;
  axios
    .post(`${url}newTweet`, {
      userId,
      content,
    })
    .then((res) => (response = res))
    .catch((err) => catchError(err));
  return response;
};

export const retrieveTweetsByUser = async (userId) => {
  try {
    const response = await axios.get(`${url}getTweetsByUserId/${userId}`);
    return response;
  } catch (error) {
    catchError(error);
  }
};

export const retrieveSearch = async (text) => {
  try {
    const response = await axios.get(`${url}getSearchResults/${text}`);
    return response.data;
  } catch (error) {
    catchError(error);
  }
};
