import Layout from "@/components/layout";
import Field from "@/ui/form/field";
import Link from "next/link";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8082/v1/user/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Login success");
      }
    } catch (error : any) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("an error occurred");
      }
    }
  }
  return (
    <>
      <Layout>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

            <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <Field
                    attribute="email"
                    required={true}
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                </div>

                <div>
                  <Field
                    attribute="password"
                    required={true}
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                </div>

                <button
                  type="submit"
                  className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                  Log in
                </button>
              </div>

              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Don&lsquo;t have an account?
                  <Link
                    href="/auth/signUp"
                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"> Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Login
