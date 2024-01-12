import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./features/store.ts";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setUpInterceptors } from "./api/auth.ts";
import SignUPInfoContextProvider from "./Context/SignUPInfoContext.tsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
setUpInterceptors();

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const theme = createTheme({
  palette: {
    primary: {
      light: "#C0C2C9",
      main: "#708090",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <SignUPInfoContextProvider>
                {/* <ThemeProvider theme={theme}> */}

                <App />
                {/* </ThemeProvider> */}
                <Toaster position="top-right" />
              </SignUPInfoContextProvider>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  </Provider>
);
