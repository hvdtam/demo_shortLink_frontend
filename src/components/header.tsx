import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import jwt_decode from "jwt-decode";

const Header = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(false);
    let storage = window.localStorage.getItem("accessToken");
    if (storage != null) {
      setAccessToken(storage);
      // @ts-ignore
      const username = jwt_decode(storage).username;
      setUser(username);
    } else {
      // console.log('storage', storage)
    }
  }, []);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (showDropdown) {
      timeout = setTimeout(() => {
        setShowDropdown(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  });
  const title =
    router.asPath == "/" || router.asPath == "/#"
      ? "Home"
      : _.startCase(router.asPath);
  return (
    <div className="bg-white lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4 md:py-8">
          <title>{title}</title>
          <Link
            href="/"
            className="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="h-auto w-6 text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            tamk
          </Link>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            {accessToken ? (
              <>
                <nav className="hidden gap-12 lg:flex">
                  <div className="dropdown relative">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1"
                      onClick={() => {
                        setShowDropdown(true);
                      }}
                    >
                      Hi{" "}
                      <span className="font-semibold text-blue-500">
                        {user}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>

                    <div
                      className={
                        `dropdown-menu absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ` +
                        (showDropdown ? "block" : "hidden")
                      }
                      role="menu"
                    >
                      <div className="p-2">
                        <Link
                          href="/manageShortlink"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          Manage Shortlinks
                        </Link>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/auth/logout"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          Sign out
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signUp"
                  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
        </header>
      </div>
    </div>
  );
};

export default Header;
