import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const access_token = localStorage.getItem("needit_access_token");

const instance = axios.create({
  timeout: 3000,
  headers: {
    Authorization: access_token,
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
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
