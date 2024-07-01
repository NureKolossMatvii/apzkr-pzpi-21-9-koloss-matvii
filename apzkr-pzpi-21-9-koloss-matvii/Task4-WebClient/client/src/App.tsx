import { jwtDecode } from "jwt-decode";
import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Context } from ".";
import { checkToken, UserClaims } from "./Admin/Auth/http/authApi";
import { AppRouter } from "./components/AppRouter/AppRouter";
import "./styles/App.css";
import mapJwtClaims from "./utils/mapJwtClaims";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "./Admin/components/UI/Loader/Loader";

const App = (() => {
  const [loading, setLoading] = useState<boolean>(true);
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  useEffect(() => {
    setLoading(true);
    checkToken().then(() => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const decodedToken = jwtDecode(token) as UserClaims;
        user.setUser(mapJwtClaims(decodedToken));
        user.setIsAuth(true)
      }
    }).catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, [user])

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
        <ToastContainer/>
        <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
