import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./features/store.ts";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setUpInterceptors } from "./api/auth.ts";
import SignUPInfoContextProvider from "./Context/SignUPInfoContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
setUpInterceptors();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <SignUPInfoContextProvider>
                <App />
              </SignUPInfoContextProvider>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  </Provider>
);
