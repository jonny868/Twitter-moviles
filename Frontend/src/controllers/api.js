const axios = require("axios").default;

const url = "http://10.0.0.115:3000/";
const urlOffice = "http://10.1.10.115:3000/"

const catchError = async (err) => {
  /// Error
  if (err.response) {
    // console.log(err.response.data.msg);
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
    // console.log("Error", err.message);
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
  const { username, password, email, location, bio, name, dob } = data;

  let response;
  await axios
    .post(`${url}register`, { username, password, email, location, bio, name, dob })
    .then((res) => (response = res))
    .catch((err) => catchError(err));
    return response;
};

export const addNewTweet = async (data) => {
  let response;
  const { userId, content, owner } = data;
  axios
    .post(`${url}newTweet`, {
      userId,
      content,
      owner
    })
    .then((res) => (response = res))
    .catch((err) => catchError(err));
  return response;
};

export const retrieveTweetsByUser = async (userId) => {
  try {
    let response = await axios.get(`${url}getTweetsByUserId/${userId}`);
    return response;
  } catch (error) {
    catchError(error);
  }
};

export const addNewComment = async (data) => {
  try {
    // console.log(data)
    let response = await axios.post(`${url}postNewComment`, data)
    return response
  } catch (error) {
    catchError(error)
  }
}

export const retrieveSearch = async (text) => {
  try {
    let response = await axios.get(`${url}getSearchResults/${text}`);
    return response.data;
  } catch (error) {
    catchError(error);
  }
};


export const deleteTweetById = async (data) => {
  try {
    let response
   await axios.post(`${url}deleteTweetById`,{data})
   .then(res => response = res)
    return response
  } catch (error) {
    catchError(error)
    
  }
}

export const retrieveComments = async (tweetId)=>{
  try {
    let response = await axios.get(`${url}getCommentsByTweet/${tweetId}`)
    // console.log(response.data)
    return response.data
  } catch (error) {
    catchError(error)
  }
}

export const likeATweet = async (liked, id, user) => {
  try {
    // console.log(data)
    let response = await axios.post(`${url}setLike`, {liked, id, user})
    // console.log(response.data)
  } catch (error) {
    catchError(error)
  }
}