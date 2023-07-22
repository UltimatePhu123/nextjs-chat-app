/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const Header = () => {
  const { data: sessionData } = useSession();
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const themeChange = () => {
      const themeData = document.querySelector("html");
      if (darkTheme) {
        themeData?.setAttribute("data-theme", "night");
      } else {
        themeData?.setAttribute("data-theme", "winter");
      }
    };

    themeChange();
  }, [darkTheme]);

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <h1 className="text-xl font-bold">
          {sessionData ? `Messages for ${sessionData.user.name}` : ""}
        </h1>
      </div>
      <div className="navbar-end">
        <label tabIndex={0} className="swap swap-rotate pr-4">
          <input type="checkbox" onChange={() => setDarkTheme(!darkTheme)} />
          <FaMoon size={"2.5rem"} className="swap-on" />
          <FaSun size={"2.5rem"} className="swap-off" />
        </label>
        <div className="dropdown-end dropdown">
          {sessionData ? (
            <>
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <img
                    src={sessionData?.user.image}
                    alt={sessionData?.user.name}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-primary p-2 font-semibold text-black shadow"
              >
                <li onClick={() => void signOut()}>
                  <a>Logout</a>
                </li>
              </ul>
            </>
          ) : (
            <button className="btn-ghost btn" onClick={() => void signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
