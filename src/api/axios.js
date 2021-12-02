import axios from "axios";
const API_END_POINT = "https://jsonplaceholder.typicode.com";

const getRequest = async (url = "", options = {}) => {
  const returnResult = await axios({
    method: "get",
    url: `${API_END_POINT}/${url}`,
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
    url: `${API_END_POINT}/${url}`,
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
    url: `${API_END_POINT}/${url}`,
    data: options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

export { getRequest, postRequest, putRequest };
