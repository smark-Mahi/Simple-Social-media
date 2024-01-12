import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./features/store.ts";
import { checkAuth, getAuth } from "./helpers/Tokens.ts";
import { useContext, useEffect } from "react";
import { login } from "./features/userSlice.ts";
import { lazy } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup/index.tsx";
import SignUPInfoContextProvider, {
  SignUpContext,
} from "./Context/SignUPInfoContext.tsx";
// import jwtDecode from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { socket } from "./helpers/socket.ts";

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
  const { setSocketEventFotMessage, setIsOnline } = useContext(SignUpContext);
  const auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const [mode] = useState("dark");
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode as PaletteMode,
  //   },
  // });

  useEffect(() => {
    socket.on("connect", () => {
      setIsOnline(true);
      console.log("connected");
    });

    socket.emit(
      "setup",
      JSON.stringify({
        user_id: auth.id,
      })
    );

    socket.on(`voted-${auth.id}`, () => {
      toast(`${auth.id} Liked your Post`, {
        icon: "👏",
      });
    });

    socket.on(`commented-${auth.id}`, () => {
      toast(`${auth.id} commented on your Post`, {
        icon: "👏",
      });
    });

    socket.on(`followed-${auth.id}`, () => {
      toast(`${auth.id} Following you`, {
        icon: "👏",
      });
    });

    socket.on(`unfollowed-${auth.id}`, () => {
      toast(`${auth.id} unFollowing you`, {
        icon: "👏",
      });
    });

    socket.on("new_message", (data) => {
      if (auth.id) {
        const regex = /(<([^>]+)>)/gi;
        const result = JSON.parse(data).content.replace(regex, "");
        toast(result, {
          icon: "👏",
        });
      }
    });

    socket.on("start_typing", (data) => {
      console.log("starttypinggg", auth.id, data.user_id);
      const isSameUser = data.user_id;
      if (isSameUser !== auth.id) {
        setSocketEventFotMessage("startTyping");
      }
    });

    socket.on("stop_typing", (data) => {
      const isSameUser = data.user_id;
      if (isSameUser !== auth.id) {
        setSocketEventFotMessage("stopTyping");
      }
    });

    return () => {
      socket.on("disconnect", () => {
        setIsOnline(false);
        console.log("Disconnected from server");
      });
    };
  }, [socket, auth]);

  useEffect(() => {
    if (checkAuth()) {
      dispatch(login(getAuth()));
    }
  }, [dispatch]);
  console.log("app");

<<<<<<< HEAD
=======
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

>>>>>>> 3e9bacf27f4c388cd82dc3be08038e94e3b2d8f2
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
