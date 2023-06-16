import React, {ReactNode} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Toaster} from "react-hot-toast";
type Props = {
  children: ReactNode;
};

const Layout = ({children}: Props) => {
  return (
    <>
      <Header/>
      <Toaster />
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
