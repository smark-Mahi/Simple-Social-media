import {User} from "../types/user"

export function setAuth(data: User ) {
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
      JSON.stringify({ ...user, access: token })
    );
  }
  
