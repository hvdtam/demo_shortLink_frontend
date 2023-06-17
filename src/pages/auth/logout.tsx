import Layout from "@/components/layout";
import {useEffect} from "react";
import Router from "next/router";

const Logout = () => {
  useEffect(() => {
    window.localStorage.removeItem('accessToken')
    Router.push("/")
  })
  return (
    <Layout>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

        </div>
      </div>
    </Layout>
  )
}
export default Logout
