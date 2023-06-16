import { Navigate } from "react-router-dom";
import { checkAuth } from "../store/actions/authentication";
import { useEffect, useState } from "react";
const UserRoute = ({ children, roles }) => {
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
  const isAuthenticated =
    authentication?.auth && roles?.includes(authentication?.role);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default UserRoute;
