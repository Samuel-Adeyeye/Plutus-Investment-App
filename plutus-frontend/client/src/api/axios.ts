import axios, { AxiosError } from "axios";

export const BASE_URL = "http://localhost:4500";

const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (request: any) => {
    const token = `Bearer ${localStorage.getItem("token") || ""}`;
    if (token) {
      request.headers = {
        ...request.headers,
        Authorization: token,
      };
    }

    return request;
  },
  (error: AxiosError) => Promise.reject(error)
);

// export default customAxios;
// const BASE_URL = "http://localhost:4500";

// export default axios.create({
//     baseURL: BASE_URL
// })
