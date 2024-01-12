import { User } from "../types/user";

export function setAuth(data: User) {
  localStorage.setItem("simpleSocial", JSON.stringify(data));
}

export function clearAuth() {
  localStorage.removeItem("simpleSocial");
}

export function updateAuthToken(token: string) {
  const user: User = JSON.parse(
    localStorage.getItem("simpleSocial") || "{access: ''}"
  );
  localStorage.setItem(
    "simpleSocial",
    JSON.stringify({ ...user, accessToken: token })
  );
}

export const getAuth = () => {
  if (typeof window.localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem("simpleSocial") || "{access: ''}");
  }
};

export const getAuthToken = () => {
  if (typeof window.localStorage !== "undefined") {
    const userObj = JSON.parse(
      localStorage.getItem("simpleSocial") || "{access: ''}"
    );
    return userObj?.accessToken;
  }
};

export function checkAuth() {
  if (localStorage.getItem("simpleSocial")) return true;
  return false;
}
