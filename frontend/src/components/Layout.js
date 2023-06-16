import { NavLink, Navigate, Outlet } from "react-router-dom";
import { signOutAction } from "../store/actions/authentication";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../store/actions/authentication";
import { useEffect, useState } from "react";
const SidebarLayout = () => {
  const navigate = useNavigate();
  const [authentication, setAuth] = useState({});

  useEffect(() => {
    checkAuth().then((data) => {
      setAuth(data);
    });
  }, []);
  if (!authentication?.auth) return <Outlet />;
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <aside className="bg-gray-800 text-white min-w-max ">
          <div className="p-4">
            <h1 className="text-3xl font-bold">Sidebar</h1>
          </div>
          <nav className="p-2">
            <ul className="space-y-2">
              {authentication?.role === "Admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block py-2 px-4 hover:bg-gray-700 transition-colors duration-300 ${
                        isActive ? "text-blue-600" : "text-white"
                      }`
                    }
                    to="/users"
                  >
                    <span className="flex items-center">
                      {/* Icon */}
                      Users
                    </span>
                  </NavLink>
                </li>
              )}
              {authentication?.role !== "Admin" && (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block py-2 px-4 hover:bg-gray-700 transition-colors duration-300 ${
                        isActive ? "text-blue-600" : "text-white"
                      }`
                    }
                  >
                    <span className="flex items-center">
                      {/* Icon */}
                      Profile
                    </span>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/deals"
                  className={({ isActive }) =>
                    `block py-2 px-4 hover:bg-gray-700 transition-colors duration-300 ${
                      isActive ? "text-blue-600" : "text-white"
                    }`
                  }
                >
                  <span className="flex items-center">
                    {/* Icon */}
                    Deals
                  </span>
                </NavLink>
              </li>
              <li>
                <button
                  className={`block py-2 px-4 hover:bg-gray-700 transition-colors duration-300 `}
                  onClick={() => signOutAction(navigate)}
                >
                  <span className="flex items-center">
                    {/* Icon */}
                    Sign Out
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 px-11 pb-7 flex flex-col">
          <Outlet context={{ role: authentication?.role }} />
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
