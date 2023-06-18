import {QRCodeCanvas} from "qrcode.react";
import {asFutureTime, asRelativeTime} from "@/helper/date";
import toast from "react-hot-toast";

interface shortLinkData {
  id: number;
  longUrl: string;
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

const Modal = ({showModal, selectedShortLink, onClose}: Props) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {selectedShortLink && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">ShortLink details</h3>
                <p className="text-sm leading-5 text-gray-500 mb-4">
                  <span className="font-bold">Original Url: </span>{selectedShortLink.longUrl}
                  <br/>
                  <span className="font-bold">Created At: </span>{asRelativeTime(selectedShortLink.createdAt)}
                  <br/>
                  <span
                    className="font-bold">Expire:</span> {selectedShortLink.expire > 0 ? (
                  <span>{selectedShortLink.expire > Math.floor(new Date().getTime() / 1000.0) ? asFutureTime(selectedShortLink.expire) : (
                    <span className="text-red-500">Expired</span>)}</span>
                ) : "Not expire"}
                </p>
                <QRCodeCanvas value={selectedShortLink.fullAliasUrl}/>
                <br/>
                <p style={{display: "flex", alignItems: "center"}}>
                  <span className="font-bold">Short Url: &nbsp;</span>
                  <a href={selectedShortLink.fullAliasUrl} className="text-blue-400">
                    {selectedShortLink.fullAliasUrl}
                  </a>
                  <button onClick={() => {
                    navigator.clipboard.writeText(selectedShortLink.aliasUrl).then(() => {
                      toast.success("Copied to clipboard");
                    })
                  }}
                          style={{marginLeft: "10px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-copy">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </p>
              </>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={onClose}
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default Modal;
