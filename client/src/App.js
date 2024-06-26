import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/homePage/HomePage";
import LoginPage from "pages/loginPage/LoginPage";
import ProfilePage from "pages/profilePage/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import NotFound from "pages/widgets/NotFound";
import { Toaster } from "react-hot-toast";


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
