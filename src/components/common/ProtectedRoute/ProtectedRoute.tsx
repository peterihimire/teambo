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
}

const ProtectedRoute: React.FC<Props> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  // const [loading, setLoading] = useState(true);

  // const getUser = userStore((state) => state.getUser );
  // const user = userStore((state) => state.user);

  // const checkAuth = useCallback(async () => {
  //   setLoading(true);
  //   if (user.fetched) {
  //     setLoading(false);
  //     return;
  //   } else {
  //     await getUser();
  //     console.log("herere");
  //     setLoading(false);
  //   }
  // }, [getUser, user.fetched]);

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
        // if (loading) return <Preloader />;
        // else if (!loading && !user.authenticated)
          return (
            <Redirect
              push
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          );
        else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
