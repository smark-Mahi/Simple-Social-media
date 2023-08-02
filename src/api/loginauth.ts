import { axiosClient } from "./auth";

// post login details
export async function loginApi(payload: {
  username: string;
  password: string;
}) {
  //const {username,password}=payload
  let dataSet = new URLSearchParams();
  dataSet.append("username", payload.username);
  dataSet.append("password", payload.password);
  const data = await axiosClient.post("/login", dataSet);
  return data;
}

export async function getPostApi() {
  const data = await axiosClient.get("/posts/");
  return data;
}

export async function createAccount(payload: unknown) {
  return await axiosClient.post("/users/", payload);
}

export async function createPostApi(payload: unknown) {
  return await axiosClient.post("/posts", payload);
}

export async function addLikeApi(payload: unknown) {
  return await axiosClient.post("/votes/", payload);
}

export async function getProfileApi(id: number) {
  const { data } = await axiosClient.get(`/users/${id}`);
  return data;
}

export async function deletePostApi(id: number) {
  return await axiosClient.delete(`/posts/${id}`);
}

export async function getPostsByIdApi(id: number) {
  const { data } = await axiosClient.get(`/posts/${id}`);
  return data;
}

export async function addCommentsApi(payload: unknown) {
  return await axiosClient.post("/comments/", payload);
}

export async function getAllCommentsById(id: number) {
  const { data } = await axiosClient.get("/comments/post_id", {
    params: {
      post_id: id,
    },
  });
  return data;
}

export async function getPostByUserIdApi(id: number) {
  const data = await axiosClient.get(`/posts/user/${id}`);
  return data;
}

export async function getAllUniqueUsersForSearchApi() {
  const data = await axiosClient.get("/users/");
  return data;
}

export async function followUserApi(id: number) {
  return await axiosClient.post(`/followers/follow/${id}`);
}
