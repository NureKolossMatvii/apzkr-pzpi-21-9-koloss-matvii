import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {  Route, Routes } from "react-router-dom";
import { Context } from "../..";
import { Navbar as NavbarAdmin } from "../../Admin/components/Navbar/Navbar";
import { Navbar } from "../../Main/components/UI/Navbar/Navbar";
import { authRoutes, publicRoutes } from "../../routes";

export const AppRouter = observer(() => {
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  return (
    <div>
      <Routes>
        {user.isAuth &&
          authRoutes.map(
            ({ path, Component, roles }) =>
              roles &&
              roles.includes(user.user.role) && (
                <Route
                  path={path}
                  key={path}
                  element={
                    <NavbarAdmin>
                      <Component />
                    </NavbarAdmin>
                  }
                />
              )
        )}

        {publicRoutes.map(({ path, Component }) => (
          <Route
            path={path}
            element={
              <Navbar>
                <Component />
              </Navbar>
            }
            key={path}
          />
        ))}
      </Routes>
    </div>
  );
});
