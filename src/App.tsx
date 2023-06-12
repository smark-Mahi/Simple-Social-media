import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile.tsx";
import Singlepost from "./pages/Singlepost";
import Signup from "./pages/Signup";
import Strtpage from "./components/Strtpage";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="singlepost" element={<Singlepost />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/startpage" element={<Strtpage />} />
      </Routes>
    </>
  );
}

export default App;
