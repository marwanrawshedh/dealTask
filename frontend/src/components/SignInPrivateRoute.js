import { Navigate } from "react-router-dom";
import { checkAuth } from "../store/actions/authentication";
import { useEffect, useState } from "react";

const SignInPrivateRoute = ({ children }) => {
  const [authentication, setAuth] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((data) => {
        console.log(data);
        setAuth(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }
  const isAuthenticated = authentication?.auth;
  console.log(isAuthenticated);

  return !isAuthenticated ? children : <Navigate to="/deals" />;
};

export default SignInPrivateRoute;
