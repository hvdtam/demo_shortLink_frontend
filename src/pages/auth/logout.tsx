import Layout from "@/components/layout";
import {useEffect} from "react";
import Router from "next/router";

const Logout = () => {
  useEffect(() => {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem("shortlinkData");
    Router.push("/")
  })
  return (
    <Layout>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Logout</h2>
        </div>
      </div>
    </Layout>
  )
}
export default Logout
