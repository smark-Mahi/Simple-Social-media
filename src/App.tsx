import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch } from "./features/store.ts";
import { checkAuth, getAuth } from "./helpers/Tokens.ts";
import { useEffect, useState } from "react";
import { login } from "./features/userSlice.ts";
import { lazy } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup/index.tsx";
import SignUPInfoContextProvider from "./Context/SignUPInfoContext.tsx";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Chat = lazy(() => import("./pages/Chat"));
const Notification = lazy(() => import("./pages/Notification"));
const Search = lazy(() => import("./pages/Search"));
const PostDetails = lazy(() => import("./pages/PostDetails/PostDetails.tsx"));
const Comments = lazy(() => import("./pages/Comments/Comments.tsx"));
const AllUsersProfile = lazy(() => import("./pages/AllUsersProfile"));

function App() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode as PaletteMode,
    },
  });
  useEffect(() => {
    if (checkAuth()) {
      dispatch(login(getAuth()));
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ThemeProvider theme={darkTheme}>
                <Home />
              </ThemeProvider>
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="notification" element={<Notification />} />
            <Route path="comments/:id" element={<Comments />} />
            <Route path="search" element={<Search />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="/posts/user/:id" element={<AllUsersProfile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={
            <SignUPInfoContextProvider>
              <Signup />
            </SignUPInfoContextProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
