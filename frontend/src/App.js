import { Route, Routes, BrowserRouter } from "react-router-dom";
import Users from "./Screen/Users";
import Profile from "./Screen/Profile";
import SignIn from "./Screen/SignIn";
import Deals from "./Screen/Deals";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import SignInPrivateRoute from "./components/SignInPrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="profile"
            element={
              <PrivateRoute roles={["User"]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute roles={["Admin"]}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="deals"
            element={
              <PrivateRoute roles={["User", "Admin"]}>
                <Deals />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/"
          element={
            <SignInPrivateRoute>
              <SignIn />
            </SignInPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
