import axios from "axios";
import { store } from "../features/store";
import { updateAccessToken } from "../features/userSlice";
import { clearAuth, updateAuthToken } from "../helpers/Tokens";

export const axiosClient = axios.create({
  baseURL: "https://simple-social.onrender.com",
  withCredentials: true,
});

export const setUpInterceptors = () => {
  axiosClient.interceptors.request.use(
    (request) => {
      const currentState = store.getState();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      request!.headers![
        "Authorization"
      ] = `Bearer ${currentState.user.accessToken}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      if (error.response && originalConfig.url !== "/login") {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const res = await axiosClient.post("/refresh");
            console.log(res.status, "res");
            const { access_token } = res.data;
            console.log(access_token, "token");
            dispatch(updateAccessToken({ token: access_token }));
            updateAuthToken(access_token);
            return axiosClient(originalConfig);
          } catch (error) {
            console.log(error, "err");
            clearAuth();
            return Promise.reject({ message: "Access token expired" });
          }
        }
      }

      return Promise.reject(error);
    }
  );
};
