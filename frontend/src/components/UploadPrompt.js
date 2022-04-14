import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaFileUpload, FaUpload } from "react-icons/fa";
import { useState } from "react";
import { create } from "ipfs-http-client";
import { useEffect } from "react";
import { use } from "chai";
// import Web3 from "web3";

const client = create("https://ipfs.infura.io:5001/api/v0");
// var Web3 = require("web3");

const Prompt = ({
  message,
  onClose,
  onSubmit,
  handleOpenClose,
  onChangeFile,
  onChangeName,
  onChangeDescription,
  onChangeThumbnail,
  currentAccount,
}) => {
  const cancelButtonRef = useRef(null);
  const [fileUrl, updateFileUrl] = useState([]);
  const [fileData, updateFileData] = useState({
    file: "",
    name: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    localStorage.setItem("fileUrl", fileUrl);
  }, [fileUrl]);
  
  const [description, updateDescription] = useState("");

  onChangeDescription = (e) => {
    updateDescription(e.target.value);
    updateFileData({ ...fileData, description: e.target.value });
  };

  onChangeFile = async (e) => {
    // get files
    updateFileData({ ...fileData, file: e.target.files[0] });
    console.log(fileData);
    console.log(e.target.files[0]);
    try {
      const file = e.target.files[0];
      const added = await client.add(file);
      updateFileData({
        ...fileData,
        file: file,
        name: fileData.file.name,
        thumbnail: added.path,
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl((prev) => [...prev, url]);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting File");
    console.log(fileData);
    console.log(fileUrl);
    // if (this.state.buffer) {
    //   console.log(this.state.contract);
    // }
    // console.log(e.target.files);
  };

  return (
    <Transition.Root show={handleOpenClose} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center align-middle h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaFileUpload className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload File
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>

                    <form
                      className="mt-8 w-full space-y-6"
                      action="#"
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-1 justify-start">
                          <label
                            htmlFor="file-upload"
                            className="flex mt-1 text-xs font-semibold"
                          >
                            Upload File
                          </label>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            required
                            onChange={onChangeFile}
                            className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Choose file to upload"
                            title="Choose File from your device "
                          />
                          {fileUrl && <img src={fileUrl} width="600px" />}
                        </div>
                        <div className="my-1">
                          <label
                            htmlFor="title"
                            className="flex mt-1 text-xs font-semibold"
                          >
                            File Title
                          </label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            // value={file.name}
                            onChange={onChangeName}
                            className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="File Name"
                          />
                        </div>
                        <div className="my-1">
                          <label
                            htmlFor="description"
                            className="flex mt-1 text-xs font-semibold self-start"
                          >
                            Description
                          </label>
                          <input
                            id="description"
                            name="description"
                            type="text"
                            required
                            value={description}
                            onChange={onChangeDescription}
                            className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Description"
                          />
                        </div>
                        <div className="my-2 justify-start">
                          <label
                            htmlFor="thumbnail"
                            className="flex mt-1 text-xs font-semibold"
                          >
                            Choose Cover Image
                          </label>
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            required
                            onChange={onChangeThumbnail}
                            className=" appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Choose Cover Image"
                            title="Choose image file from your device"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 outline-none w-full inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-full outline-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  <FaUpload className="h-4 w-4 mr-1" />
                  Upload
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Prompt;
