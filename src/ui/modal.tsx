import {QRCodeCanvas} from "qrcode.react";
import {asFutureTime, asRelativeTime} from "@/helper/date";

interface shortLinkData {
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
                  <span className="font-bold">Short Url: </span>
                  <a href={selectedShortLink.aliasUrl} className="text-blue-400">
                    {selectedShortLink.aliasUrl}
                  </a>
                  <br/>
                  <span className="font-bold">Created At: </span>{asRelativeTime(selectedShortLink.createdAt)}
                  <br/>
                  <span
                    className="font-bold">Expire:</span> {selectedShortLink.expire > 0 ? (
                  <span>{selectedShortLink.expire > Math.floor(new Date().getTime() / 1000.0) ? asFutureTime(selectedShortLink.expire) : (
                    <span className="text-red-500">Expired</span>)}</span>
                ) : "Not expire"}
                </p>
                <QRCodeCanvas value={selectedShortLink.aliasUrl}/>
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
