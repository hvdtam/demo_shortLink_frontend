import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React, {useState} from "react";
import {User, UserContext} from "@/lib/UserContext";

export default function App({Component, pageProps}: AppProps) {
  const [user, setUser] = useState<User>({
    username: '',
    accessToken: ''
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
