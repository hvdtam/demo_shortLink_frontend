import Layout from "@/components/layout";
import Field from "@/ui/form/field";
import Dropdown from "@/ui/form/dropdown";
import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import apiUrl from "@/config/api";
import toast from "react-hot-toast";
import {QRCodeCanvas} from 'qrcode.react';
import Modal from "@/ui/modal";
import {configApi} from "@/config/configApi";
import {trimValue} from "@/helper/data";

interface shortlinkData {
  id: number;
  longUrl: string;
  aliasUrl: string;
  password: string;
  status: number;
  expire: number;
  totalClick: number;
  createdAt: number;
  createdBy: number;
  updatedAt: number;
}

const HomePage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [aliasUrl, setAliasUrl] = useState("");
  const [password, setPassword] = useState("");
  const [expire, setExpire] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedShortLink, setSelectedShortLink] = useState<shortlinkData | null>(null);
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
  const fetchShortLink = async () => {
    try {
      const response = await axios.get(apiUrl + "shortlink", configApi);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchShortLink();
  }, []);
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
        await fetchShortLink();
        setLongUrl("")
        setAliasUrl("")
        setPassword("")
        setExpire("")
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShortLink(null);
  };
  const handleClickShortLink = (item: shortlinkData) => {
    setSelectedShortLink(item);
    setShowModal(true);
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLongUrl(trimValue(event.target.value))}
              />
            </div>
            <div>
              <Field
                label="Enter alias"
                attribute="alias"
                required={false}
                placeholder={"If empty, generate randomly"}
                value={aliasUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAliasUrl(trimValue(event.target.value))}
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
            <div className="my-3 2xl:mx-48 md:mx-5 lg:mx-24">
              <div className="md:mb-5">
                <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 lg:text-2xl">
                  My list ShortLink
                </h2>
              </div>
              <div className="w-full bg-white rounded-lg shadow-lg">
                <ul className="divide-y-2 divide-gray-100">
                  {data.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 hover:bg-blue-400 hover:text-blue-200 rounded"
                      onClick={() => handleClickShortLink(item)}
                    >
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              <span className="font-bold">Original Url: </span> {item.longUrl}
                            </span>
                            <span className="text-sm text-gray-800">
                              <span className="font-bold">Short Url</span>: {item.aliasUrl}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <QRCodeCanvas className="h-10 w-10" value={item.aliasUrl}/>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
      {showModal && (<Modal showModal={showModal} selectedShortLink={selectedShortLink} onClose={handleCloseModal}/>)}
    </Layout>
  );
};

export default HomePage;
