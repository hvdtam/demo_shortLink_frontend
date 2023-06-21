import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import apiUrl from "@/config/api";
import { configApi } from "@/config/configApi";
import { shortlinkData } from "@/models/interface/shortlink";
import Link from "next/link";

const ManageShortlinkIndex = () => {
  const [data, setData] = useState<shortlinkData[]>([]);
  const fetchShortLink = async () => {
    try {
      const response = await axios.get(
        apiUrl + "shortlink/?sortby=id&order=desc",
        configApi
      );
      if (response.status === 200) {
        setData(response.data);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          const shortlinkData = JSON.stringify(response.data);
          localStorage.setItem("shortlinkData", shortlinkData);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchShortLink();
  }, []);
  return (
    <>
      <Layout>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="my-3 md:mx-5 lg:mx-24 2xl:mx-48">
              <div className="md:mb-5">
                <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 lg:text-2xl">
                  My list ShortLink
                </h2>
              </div>
              <div className="w-full rounded-lg bg-white shadow-lg">
                {data.length > 0 ? (
                  data.map((item) => (
                    <ul className="divide-y-2 divide-gray-100" key={item.id}>
                      <Link
                        href={{
                          pathname: "/manageShortlink/[id]",
                          query: { id: item.aliasUrl },
                        }}
                      >
                        <li className="rounded p-6 hover:bg-blue-400 hover:text-blue-200">
                          <div className="flex items-center">
                            <div className="flex-grow">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">
                                  <span className="font-bold">
                                    Original Url:{" "}
                                  </span>{" "}
                                  {item.longUrl}
                                </span>
                                <span className="text-sm text-gray-800">
                                  <span className="font-bold">Short Url</span>:{" "}
                                  {item.aliasUrl}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <QRCodeCanvas
                                className="h-10 w-10"
                                value={item.aliasUrl}
                              />
                            </div>
                          </div>
                        </li>
                      </Link>
                    </ul>
                  ))
                ) : (
                  <>
                    <ul className="divide-y-2 divide-gray-100">
                      <div className="py-12">
                        <div className="flex items-center justify-center">
                          <div className="flex flex-col">
                            <span className="text-xl text-gray-800">
                              <span className="font-normal">No data</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ManageShortlinkIndex;
