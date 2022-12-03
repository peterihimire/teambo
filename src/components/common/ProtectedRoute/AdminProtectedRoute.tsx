// import React, { useCallback, useEffect, useState } from "react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./../../../services/authService";
// import { userStore } from "../../../store/userStore";
// import Preloader from "../preloader/Preloader";

interface Props {
  path?: any;
  component?: any;
  render?: any;
  exact?: any;
}

const AdminProtectedRoute: React.FC<Props> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (auth.checkCurrentUserIsAdmin() === false)
          return (
            <Redirect
              to={{ pathname: "/admin/auth", state: { from: props.location } }}
            />
          );
        else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminProtectedRoute;
