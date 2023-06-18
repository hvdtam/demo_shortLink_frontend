import {useRouter} from 'next/router';
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import {configApi} from "@/config/configApi";
import urlShortlink from "@/config/urlShortlink";

interface IDataUrl {
  aliasUrl: string;
  longUrl: string;
  status: string;
}

export default function Redirect() {
  const [dataUrl, setDataUrl] = useState<IDataUrl[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState(0);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchShortLink = async () => {
      try {
        if (!router.query.slug) {
          return;
        }
        const response = await axios.get(urlShortlink + router.query.slug, configApi);
        if (response.status === 200) {
          setStatus(200)
          setDataUrl(response.data);
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          setStatus(404)
        } else if (error.response.status === 410) {
          setStatus(410)
        }
        console.error(error);
      }
    };
    fetchShortLink().then(r => {
      console.log("fetchShortLink")
    });
  }, [router.query.slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0 && dataUrl.length > 0 && !redirected) {
      setRedirected(true);
      // @ts-ignore
      window.location.href = dataUrl.longUrl;
    }
  }, [countdown, dataUrl, redirected]);

  return (
    <>
      <title>Get Link</title>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <Link href="/"
                  className="text-black-800 mb-8 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
                  aria-label="logo">
              <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500"
                   fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M96 0V47L48 94H0V47L48 0H96Z"/>
              </svg>

              Shorten Link
            </Link>
            {status === 200 && dataUrl && (
              <>
                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <a
                    // @ts-ignore
                    href={dataUrl.longUrl}
                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-700 focus-visible:ring active:bg-blue-800 md:text-base">
                    Start now
                  </a>
                </div>
                <br/>
                {countdown > 0 && (
                  <p className="text-blue-600">
                    Auto redirect on {countdown} seconds...
                  </p>
                )}
                {!redirected && countdown === 0 && (
                  <p className="text-blue-600">
                    Redirecting...
                  </p>
                )}
                <br/>
                <div className="my-5">
                  <Link
                    href="/"
                    className="inline-block rounded-lg bg-gray-200 px-4 py-1.5 text-center text-sm text-gray-600 outline-none ring-gray-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                    Create a new link
                  </Link>
                </div>
              </>
            )}
            {status === 404 && (
              <>
                <div className="flex flex-col items-center">
                  <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                    Shortlink not found
                  </h1>

                  <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
                    The page you’re looking for doesn’t exist.
                  </p>

                  <Link
                    href="/"
                    className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                    Create a new link
                  </Link>
                </div>
              </>
            )}
            {status === 410 && (
              <>
                <div className="flex flex-col items-center">
                  <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                    Shortlink has expired
                  </h1>

                  <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
                    The page you’re looking for doesn’t exist.
                  </p>

                  <Link
                    href="/"
                    className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                    Create a new link
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
