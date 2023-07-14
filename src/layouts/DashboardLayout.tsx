import useScrollPos from "@app/hooks/UseScrollPos";
import classNames from "@app/libs/ClassNames";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const scrollPos = useScrollPos();
  const navigate = useNavigate();
  const { auth, loading } = useAuth();

  const navLink = ["Devotional", "Quiz"];

  useEffect(() => {
    if (!auth && !loading) {
      navigate("/login");
    }
  }, [auth, loading, navigate]);

  return (
    <div>
      <nav
        className={`sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 bg-theme-50 dark:bg-theme-900 border-gray-200 dark:border-theme-500 firefox:bg-opacity-70 ${
          scrollPos > 20 ? "border-b" : ""
        }`}
      >
        <div className="layout">
          <div className="flex items-center justify-between h-20">
            <div className="flex space-x-4 text-gray-900">
              {navLink.map((link) => (
                <NavLink
                  key={link}
                  to={`/dashboard/${link.toLowerCase()}`}
                  aria-label={link}
                  className={({ isActive }) =>
                    classNames(
                      "text-theme-700 dark:text-theme-200 transition duration-500",
                      isActive
                        ? "border-b border-primary-700 dark:border-primary-400"
                        : ""
                    )
                  }
                >
                  {link}
                </NavLink>
              ))}
            </div>
            {/* <Menu as="div" className="relative inline-block text-left"> */}
            <div>
              <button
                className="px-2 py-2 font-medium text-theme-700 dark:text-theme-200 bg-primary-400 bg-opacity-50 rounded-md dark:bg-theme-700"
                aria-label="logout"
              >
                <BiLogOut />
              </button>
            </div>

            {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-theme-700 dark:text-theme-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-2">
                  <div className="py-1">
                    {modes.map((mode, key) => (
                      <Menu.Item key={key}>
                        <div className="mx-2">
                          <button
                            onClick={() => changeTheme(mode as ThemeType)}
                            className={classNames(
                              theme === mode
                                ? "bg-theme-200 dark:bg-theme-600 text-theme-800 dark:text-theme-50"
                                : "",
                              "px-4 py-2 text-sm flex items-center hover:bg-primary-200 dark:hover:bg-primary-700 rounded-md transition-colors w-full",
                              key === 0 ? "" : "mt-1"
                            )}
                          >
                            {renderIcon(mode as ThemeType)}
                            <p className="mx-2">
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </p>
                          </button>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition> */}
            {/* </Menu> */}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
