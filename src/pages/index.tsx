import Layout from "@/components/layout";
import Field from "@/ui/form/field";
import Dropdown from "@/ui/form/dropdown";
import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import apiUrl from "@/config/api";
import toast from "react-hot-toast";
import Router from "next/router";

const HomePage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [aliasUrl, setAliasUrl] = useState("");
  const [password, setPassword] = useState("");
  const [expire, setExpire] = useState("");
  const options = [
    {key: 3600, value: '1 hour'},
    {key: 10800, value: '3 hours'},
    {key: 43200, value: '12 hours'},
    {key: 86400, value: '1 day'},
    {key: 259200, value: '3 days'},
    {key: 604800, value: '1 week'},
    {key: 2629743, value: '1 month'},
  ];
  const validateForm = (): boolean => {
    if (longUrl.length < 5 ) {
      toast.error("Long link is too short");
      return false;
    }
    if (longUrl.length > 250 ) {
      toast.error("Long link is too long");
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
        apiUrl + "shortlink",
        {
          longUrl,
          aliasUrl,
          password,
          expire: parseInt(expire),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Created ShortLink success");
        window.localStorage.setItem('accessToken', response.data.access_token)
        await Router.push("/")
        setLongUrl("")
        setAliasUrl("")
        setPassword("")
        setExpire("")
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-3" onSubmit={handleSubmit}>
            <div className="sm:col-span-3">
              <Field
                label="Enter Long link"
                attribute="longLink"
                required={true}
                value={longUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLongUrl(event.target.value)}
              />
            </div>
            <div>
              <Field
                label="Enter alias"
                attribute="alias"
                required={false}
                placeholder={"If empty, generate randomly"}
                value={aliasUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAliasUrl(event.target.value)}
              />
            </div>
            <div>
              <Field
                label="Enter password"
                attribute="password"
                required={false}
                type={"password"}
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <Dropdown
                defaultValue={"Not expire"}
                label="Expire"
                attribute="expire"
                options={options}
                required={false}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setExpire(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between sm:col-span-2">
              <button
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                Send
              </button>
            </div>
          </form>
          <>
            <div className="container flex justify-center mx-auto w-3/4">
              <div className="bg-white rounded shadow lg:w-1/3">
                <ul className="divide-y divide-gray-100">
                  <li className="p-3 hover:bg-blue-600 hover:text-blue-200 rounded">
                    List Item 1
                  </li>
                  <li className="p-3 hover:bg-blue-600 hover:text-blue-200 rounded">
                    List Item 2
                  </li>
                  <li className="p-3 hover:bg-blue-600 hover:text-blue-200 rounded">
                    List Item 3
                  </li>
                  <li className="p-3 hover:bg-blue-600 hover:text-blue-200 rounded">
                    List Item 4
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
