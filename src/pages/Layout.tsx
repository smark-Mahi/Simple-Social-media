import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import BeatLoader from "react-spinners/BeatLoader";

const Layout = () => {
  return (
    <div className="md:flex bg-white">
      <div className="md:basis-1/6 ">
        <Sidebar />
      </div>
      <div className="md:basis-11/12 h-screen">
        <ErrorBoundary fallback={<p>An error has been occured</p>}>
          <Suspense
            fallback={
              <div className="flex justify-center mt-[240px]">
                <BeatLoader size={10} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
