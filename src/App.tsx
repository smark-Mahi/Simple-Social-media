import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch } from "./features/store.ts";
import { checkAuth, getAuth } from "./helpers/Tokens.ts";
import { useEffect } from "react";
import { login } from "./features/userSlice.ts";
import { lazy } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup/index.tsx";
import SignUPInfoContextProvider from "./Context/SignUPInfoContext.tsx";
// import jwtDecode from "jwt-decode";
// import { useNavigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Chat = lazy(() => import("./pages/Chat/index.tsx"));
const Notification = lazy(() => import("./pages/Notification"));
const Search = lazy(() => import("./pages/Search"));
const PostDetails = lazy(() => import("./pages/PostDetails/PostDetails.tsx"));
const Comments = lazy(() => import("./pages/Comments/Comments.tsx"));
const AllUsersProfile = lazy(() => import("./pages/AllUsersProfile"));
const MobileChatPage = lazy(
  () => import("./pages/MobileChatPage/MobileChatPage.tsx")
);

// type Decoded = {
//   exp: number;
  //when we decode jwt we would get more authentic info ,i just write one of them
// };

function App() {
  const dispatch = useAppDispatch();
  // const auth = useAppSelector((state) => state.user);
  // const navigate = useNavigate();
  // const [mode] = useState("dark");
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode as PaletteMode,
  //   },
  // });
  useEffect(() => {
    if (checkAuth()) {
      dispatch(login(getAuth()));
    }
  }, [dispatch]);
  console.log("app");

  // useEffect(() => {
  //   let login = localStorage.getItem("simpleSocial");
  //   console.log(login, "lo");
  //   if (login) {
  //     const currentTime = Date.now() / 1000;
  //     console.log(currentTime, "currenttime");
  //     if (auth.exp < currentTime) {
  //       clearAuth();
  //       console.log("true");
  //     }
  //   }
  // });

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="/chat/chat/:id" element={<MobileChatPage />} />
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
