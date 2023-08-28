import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import BeatLoader from "react-spinners/BeatLoader";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  return (
    <div className="md:flex bg-white">
      <div className="basis-64 z-40">
        <Sidebar />
      </div>
      <div className="flex-auto h-max bg-white">
        <ErrorBoundary fallback={<p>An error has been occured</p>}>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <BeatLoader size={10} />
              </div>
            }
          >
            <AnimatePresence mode="wait">
              {" "}
              <Outlet key={Math.random()} />
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
