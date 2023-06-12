
import { axiosClient } from "./auth";


 // post login details
export async function loginApi(payload:{ username: string; password: string }) {
  //const {username,password}=payload
    let dataSet=new URLSearchParams()
    dataSet.append("username",payload.username)
    dataSet.append("password",payload.password)
    const data = await axiosClient.post("/login", dataSet,)
    return data 
  }


  export async function getPostApi(){
    const data=await axiosClient.get("/posts")
    return data
  }