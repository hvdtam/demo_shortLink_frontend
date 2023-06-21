import Layout from "@/components/layout";
import Field from "@/ui/form/field";
import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Router from "next/router";
import { trimValue } from "@/helper/data";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const validateForm = (): boolean => {
    if (username.length < 4) {
      toast.error("Username is too short");
      return false;
    }
    if (username.length > 25) {
      toast.error("Username is too long");
      return false;
    }
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (password.length < 4) {
      toast.error("Passwords is too short");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        process.env.API_URL + "user/register",
        {
          username,
          password,
          repeatPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Register success");
        window.localStorage.setItem("accessToken", response.data.access_token);
        await Router.push("/");
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("an error occurred");
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
              Sign Up
            </h2>

            <form
              className="mx-auto max-w-lg rounded-lg border"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <Field
                    attribute="username"
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(trimValue(event.target.value))
                    }
                    required={true}
                  />
                </div>

                <div>
                  <Field
                    attribute="password"
                    value={password}
                    type="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                    required={true}
                  />
                </div>

                <div>
                  <Field
                    attribute="repeatPassword"
                    type="password"
                    value={repeatPassword}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setRepeatPassword(event.target.value)
                    }
                    required={true}
                  />
                </div>

                <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Have an account?
                  <Link
                    href="/auth/login"
                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Login;
