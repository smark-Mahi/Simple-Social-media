import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import BeatLoader from "react-spinners/BeatLoader";

const Layout = () => {
  return (
    <div className="md:flex">
      <div className="basis-60 z-40">
        <Sidebar />
      </div>
      <div className="flex-auto h-max bg-white">
        <ErrorBoundary fallback={<p>An error has been occured</p>}>
          <Suspense
            fallback={
              <div className="flex justify-center mt-[280px] md:mt-[450px]">
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
