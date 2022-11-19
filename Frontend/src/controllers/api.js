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
    .post(url, {
      username,
      password,
    })
    .then((res) => (response = res))
    .catch((err) => catchError(err));

  return response;
};
