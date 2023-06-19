import React, {useEffect, useState} from "react";
import {shortlinkData} from "@/models/interface/shortlink";
import axios from "axios";
import apiUrl from "@/config/api";
import {configApi} from "@/config/configApi";
import toast from "react-hot-toast";
import Field from "@/ui/form/field";
import {trimValue} from "@/helper/data";
import Dropdown from "@/ui/form/dropdown";
import Layout from "@/components/layout";
import Router, {useRouter} from "next/router";

const ManageShortlink = () => {
  const router = useRouter();
  const [longUrl, setLongUrl] = useState("");
  const [aliasUrl, setAliasUrl] = useState("");
  const [password, setPassword] = useState("");
  const [expire, setExpire] = useState("");
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<shortlinkData[]>([]);
  const options = [
    {key: 3600, value: '1 hour'},
    {key: 10800, value: '3 hours'},
    {key: 43200, value: '12 hours'},
    {key: 86400, value: '1 day'},
    {key: 259200, value: '3 days'},
    {key: 604800, value: '1 week'},
    {key: 2629743, value: '1 month'},
  ];


  useEffect(() => {
    const fetchShortLink = async () => {
      try {
        if (!router.query.id) {
          return;
        }
        const response = await axios.get(apiUrl + "shortlink/manager/" + router.query.id, configApi);
        if (response.status === 200) {
          setStatus(200)
          setAliasUrl(response.data.aliasUrl)
          setLongUrl(response.data.longUrl)
        } else if (response.status === 401) {
          setStatus(401)
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchShortLink().then(r => {
      console.log("fetchShortLink")
    });
  }, [router.query.id]);


  const validateForm = (): boolean => {
    if (longUrl.length < 5) {
      toast.error("Long link is too short");
      return false;
    }
    if (longUrl.length > 250) {
      toast.error("Original link is too long");
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
      const response = await axios.put(
        apiUrl + "shortlink/manage/" + aliasUrl,
        {
          longUrl,
          aliasUrl,
          password,
          expire: parseInt(expire),
        }, configApi
      );
      if (response.status === 200) {
        toast.success("Updated ShortLink success");
        setLongUrl("")
        setAliasUrl("")
        setPassword("")
        setExpire("")
        await Router.push("/manageShortlink");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {status == 200 ? (
          <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-3" onSubmit={handleSubmit}>
            <div className="sm:col-span-3">
              <Field
                label="Enter Long link"
                attribute="longLink"
                required={true}
                value={longUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLongUrl(trimValue(event.target.value))}
              />
            </div>
            <div>
              <Field
                label="Enter alias"
                attribute="alias"
                required={false}
                value={aliasUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAliasUrl(trimValue(event.target.value))}
                disabled={true}
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
          ) : (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-blue-800 md:text-3xl">404</h1>
              <br/>
              <p className="text-blue-300 md:text-lg">Sorry, page not found</p>
              <div className="mt-6">
                <button
                  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                  onClick={() => Router.push("/")}
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default ManageShortlink
