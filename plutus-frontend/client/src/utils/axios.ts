/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import { setData } from "../features/dataSlice";

const baseUrl = "http://localhost:4500";
// export const baseUrl = "http://localhost:4500";
// export const baseUrl = "http://localhost:4500";

export const apiGet = (path:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  };

  return axios.get(`${baseUrl}${path}`, config); // axios.get('http://localhost:4500/user/get-user', config)
};

export const apiPost = async (path:string, data:unknown) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  };
  return await axios.post(`${baseUrl}${path}`, data, config); // axios.post('http://localhost:4500/user/signup', formdata config)
};

export const FormDataPost = async (path:string, data:unknown) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post(`${baseUrl}${path}`, data, config);
};

export const apiPut = (path:string, data:object) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": [ "application/json"]
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const formDataPut = (path:string, data:object) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data"
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiPatch = (path:string, data:object) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": ["application/json"]
    },
  };

  return axios.patch(`${baseUrl}${path}`, data, config);
};

export const formDataPatch = (path:string, data:object) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data"
    },
  };

  return axios.patch(`${baseUrl}${path}`, data, config);
};

export const apiDelete = (path:string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  };

  return axios.delete(`${baseUrl}${path}`, config);
};

