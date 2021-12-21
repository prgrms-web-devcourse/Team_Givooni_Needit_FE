import axios from "axios";
import jwt_decode from "jwt-decode";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("needit_access_token");
      if (token && token.length > 0) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    if (
      localStorage.getItem("needit_access_token") &&
      Math.floor(Date.now() / 1000) >
        jwt_decode(localStorage.getItem("needit_access_token")).exp
    ) {
      localStorage.removeItem("needit_access_token");
    }
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const getRequest = async (url = "", options = {}) => {
  const returnResult = await instance({
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
  const returnResult = await instance({
    method: "post",
    url: `${API_BASE_URL}/${url}`,
    ...options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

const putRequest = async (url = "", options = {}) => {
  const returnResult = await instance({
    method: "put",
    url: `${API_BASE_URL}/${url}`,
    ...options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

const deleteRequest = async (url = "", options = {}) => {
  const returnResult = await instance({
    method: "delete",
    url: `${API_BASE_URL}/${url}`,
    ...options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

const patchRequest = async (url = "", options = {}) => {
  const returnResult = await instance({
    method: "patch",
    url: `${API_BASE_URL}/${url}`,
    ...options,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return returnResult;
};

export { getRequest, postRequest, putRequest, deleteRequest, patchRequest };
