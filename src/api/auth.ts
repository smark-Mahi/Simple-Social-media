import axios from "axios";
import { store } from "../features/store";
import { updateAccessToken } from "../features/userSlice";
import { clearAuth, updateAuthToken } from "../helpers/Tokens";

export const axiosClient = axios.create({
  baseURL: "https://flickz-server.csproject.org/",
  withCredentials: true,
});
console.log("this is begning");
let notExpire = 0;
export const setUpInterceptors = (navigate: any) => {
  console.log(notExpire, "expirecount in request");
  axiosClient.interceptors.request.use(
    (request) => {
      const currentState = store.getState();
      console.log(currentState, "me");
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
      console.log(notExpire, "expirecountin response");
      return response;
    },

    async (error) => {
      console.log("start");
      const originalConfig = error.config;
      console.log(originalConfig, "see originconfig");
      if (error.response && originalConfig.url !== "/login") {
        console.log(
          error.response.status === 401 && !originalConfig._retry,
          notExpire,
          "checkconditionjust"
        );
        if (
          error.response.status === 401 &&
          !originalConfig._retry &&
          notExpire != 5
        ) {
          console.log(
            error.response.status === 401 && !originalConfig._retry,
            "checkcondition"
          );
          originalConfig._retry = true;
          notExpire += 1;
          try {
            console.log("enter in try block refresh the token");
            const res = await axiosClient.post("/refresh");
            notExpire = 0;
            console.log(res.status, "res");
            const { access_token } = res.data;
            console.log(access_token, "token");
            dispatch(updateAccessToken({ token: access_token }));
            updateAuthToken(access_token);
            return axiosClient(originalConfig);
          } catch (error: any) {
            console.log(error, "error");
            if (error.response.status === 400) {
              clearAuth();
              return Promise.reject({
                message:
                  "Refresh token not found in cookies and Access token expired",
              });
            }
            console.log("this is clear auth part", error?.response?.status);
            return Promise.reject({ message: "Access token expired" });
          }
        }
        if (notExpire === 5) {
          clearAuth();
          notExpire = 0;
          console.log("refresh token expired");
          navigate("/login");
          return Promise.reject({ message: "refresh token expired" });
        }
      }
      notExpire = 0;
      console.log("end");
      return Promise.reject(error);
    }
  );
};
