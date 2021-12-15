import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getRequest = async (url = "", options = {}) => {
  const returnResult = await axios({
    method: "get",
    url: `${API_BASE_URL}/${url}`,
    ...options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  return returnResult;
};

const postRequest = async (url = "", options = {}) => {
  const returnResult = await axios({
    method: "post",
    url: `${API_BASE_URL}/${url}`,
    data: options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

const putRequest = async (url = "", options = {}) => {
  const returnResult = await axios({
    method: "put",
    url: `${API_BASE_URL}/${url}`,
    data: options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

export { getRequest, postRequest, putRequest };
