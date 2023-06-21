import { QRCodeCanvas } from "qrcode.react";
import { asFutureTime, asRelativeTime } from "@/helper/date";
import toast from "react-hot-toast";
import Link from "next/link";

interface shortLinkData {
  longUrl?: string;
  id: number;
  longLink?: string;
  originalUrl?: string;
  aliasUrl: string;
  fullAliasUrl: string;
  password: string;
  status: number;
  expire: number;
  totalClick: number;
  createdAt: number;
  createdBy: number;
  updatedAt: number;
}

type Props = {
  showModal: boolean;
  selectedShortLink: shortLinkData | null;
  onClose: () => void;
};

const Modal = ({ showModal, selectedShortLink, onClose }: Props) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {selectedShortLink && (
              <>
                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                  ShortLink details
                </h3>
                <p className="mb-4 text-sm leading-5 text-gray-500">
                  <span className="font-bold">Original Url: </span>
                  {selectedShortLink.longUrl}
                  <br />
                  <span className="font-bold">Created At: </span>
                  {asRelativeTime(selectedShortLink.createdAt)}
                  <br />
                  <span className="font-bold">Expire:</span>{" "}
                  {selectedShortLink.expire > 0 ? (
                    <span>
                      {selectedShortLink.expire >
                      Math.floor(new Date().getTime() / 1000.0) ? (
                        asFutureTime(selectedShortLink.expire)
                      ) : (
                        <span className="text-red-500">Expired</span>
                      )}
                    </span>
                  ) : (
                    "Not expire"
                  )}
                </p>
                <QRCodeCanvas value={selectedShortLink.fullAliasUrl} />
                <br />
                <p className="align flex items-center break-all">
                  <span className="font-bold">Short Url: &nbsp;</span>
                  <a
                    href={selectedShortLink.fullAliasUrl}
                    className="text-blue-400"
                  >
                    {selectedShortLink.fullAliasUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .writeText(selectedShortLink.fullAliasUrl)
                        .then(() => {
                          toast.success("Copied to clipboard");
                        });
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-copy"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </p>
              </>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="focus:shadow-outline-indigo inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none sm:text-sm sm:leading-5"
                onClick={onClose}
              >
                Close
              </button>
            </span>
            <span className="flex rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <Link
                href={`/manageShortlink/${selectedShortLink?.aliasUrl}`}
                type="button"
                className="focus:shadow-outline-indigo inline-flex w-full justify-self-start rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none sm:text-sm sm:leading-5"
              >
                Edit
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
