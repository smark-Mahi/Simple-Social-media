import axios from "axios";
import { store } from "../features/store";
import { updateAccessToken } from "../features/userSlice";
import { clearAuth, updateAuthToken } from "../helpers/Tokens";

export const axiosClient = axios.create({
  baseURL: "https://simple-social.onrender.com",
  withCredentials: true,
});
let isRefresh = false;
let isResponseStatus = "unauthorized";
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
  console.log("here");

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401 && !isRefresh) {
        isRefresh = true;
        console.log(isResponseStatus, "isresp", "line39");
        const res = await axiosClient.post("/refresh");
        const { access_token } = res.data;
        console.log(access_token, "token");
        dispatch(updateAccessToken({ token: access_token }));
        updateAuthToken(access_token);
        isResponseStatus = "authorize";
        return axiosClient(error.config);
      }
      if (isResponseStatus === "unauthorized") {
        clearAuth();
         if (
           window.location.href !== "https://simple-social-smark.netlify.app/"
         ) {
           window.location.href =
             "https://simple-social-smark.netlify.app/login";
         }
        
        console.log("chnge loc", window.location.href);
      }
      isRefresh = false;
      isResponseStatus = "unauthorized";
      console.log("loop");
      return Promise.reject(error);
    }
  );
};
