import React from "react";
import { Fragment, useState, useMemo, useEffect } from "react";

import { Popover, Transition, Menu } from "@headlessui/react";
import {
  FaWallet,
  FaBars,
  FaTimesCircle,
  FaTh,
  FaList,
  FaShare,
  FaUpload,
} from "react-icons/fa";
import Prompt from "../components/UploadPrompt";
import SharePrompt from "../components/SharePrompt";
import Pagination from "../components/Pagination";

const Homepage = ({ currentAccount, data }) => {
  let PageSize = 12;
  const [listView, setListView] = useState(false);
  const [uploadPrompt, setUploadPrompt] = useState(false);
  const [sharePrompt, setSharePrompt] = useState(false);
  const [tab, setTab] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState([]);
  const [searchField, setSearchField] = useState("");

  const searchFile = files.filter((f) =>
    f.title.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchFile.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // useEffect(() => {
  //   setFiles(data);
  //   console.log(currentPageData);
  // }, [currentAccount, currentPageData]);

  useEffect(() => {
    setFiles(data);
  }, [currentAccount]);
  return (
    <div className="dark:bg-slate-900 h-screen">
      <div className="relative bg-white dark:bg-slate-900 p-1">
        <div className="max-w-7xl mx-auto">
          <div className="relative  pb-8 bg-white dark:bg-slate-900   lg:w-full">
            <Popover>
              <div className="pt-6 px-4 sm:px-6 lg:px-8 ">
                <nav
                  className="relative flex items-center justify-between sm:h-10"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0 ">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">NestCoin</span>
                        <h1 className="h-8 w-auto sm:h-10 text-indigo-600 text-3xl font-extrabold">
                          NestCoin
                        </h1>
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white dark:bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>

                          <FaBars className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex self-center  md:ml-10 md:pr-4 md:space-x-8">
                    <button className="font-medium outline-none text-gray-500 hover:text-gray-900 flex">
                      <FaWallet className="h-6 w-6 mr-2" />
                      {`${currentAccount.slice(0, 4)}... ${currentAccount.slice(
                        -4
                      )}`}
                    </button>
                    <button className="font-medium outline-none text-indigo-500 hover:text-gray-900 flex">
                      Disconnect
                    </button>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10  top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md dark:bg-slate-900 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <h1 className="h-8 w-auto text-xl font-extrabold text-indigo-600">
                          Blockgames
                        </h1>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white dark:bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>

                          <FaTimesCircle className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-6  space-y-1">
                      <FaWallet className="fa-solid fa-wallet text-gray-400 h-6 w-6 mr-2" />
                      <p className="text-gray-400">
                        {`${currentAccount.slice(
                          0,
                          4
                        )}... ${currentAccount.slice(-4)}`}
                      </p>
                      <button className="block      px-3 outline-none     rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"></button>
                    </div>
                    <button className="font-medium px-6 pb-2 outline-none text-indigo-600 hover:text-indigo-500">
                      Disconnect Wallet
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
      <div className="antialiased font-sans dark:bg-slate-900 ">
        <div className="container mx-auto px-3 sm:px-2">
          <div className="py-2">
            <div className="px-4 md:px-2 py-4 md:py-7">
              <div className="block sm:flex sm:items-center sm:justify-between">
                <div className="text-sm mb-2  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                    <li className="sm:mr-2">
                      <div
                        className={
                          tab
                            ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                            : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }
                        onClick={() => setTab(true)}
                      >
                        All Files
                      </div>
                    </li>
                    <li className="sm:mr-2">
                      <div
                        className={
                          !tab
                            ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                            : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }
                        aria-current="page"
                        onClick={() => setTab(false)}
                      >
                        My Files
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex">
                  <div className="py-3 px-4 mr-2 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <p>Sort By:</p>
                    <select
                      aria-label="select"
                      className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                    >
                      <option className="text-sm text-indigo-800">
                        Latest
                      </option>
                      <option className="text-sm text-indigo-800">
                        Oldest
                      </option>
                    </select>
                  </div>
                  <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    {listView ? (
                      <FaTh
                        className="h-6 w-6"
                        onClick={() => setListView(false)}
                      />
                    ) : (
                      <FaList
                        className="h-6 w-6"
                        onClick={() => setListView(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 flex justify-center sm:flex-row flex-col">
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  onChange={(e) => handleSearch(e)}
                  className="appearance-none rounded  border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <button
                onClick={() => setUploadPrompt(true)}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 mb-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <FaUpload className="text-white h-3 w-3 mr-1" />
                <p className="text-sm font-medium leading-none text-white">
                  Upload File
                </p>
              </button>
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                {/* {listView && (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-200 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Files
                        </th>
                        <th className="px-5 py-3 border-b-2 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-200 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-5 py-3 border-b-2 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-200 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          size
                        </th>
                        <th className="px-5 py-3 border-b-2 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-200 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchFile.map((f) => (
                        <tr key={f.title + f._id}>
                          <td
                            className={`px-5 py-5 border-b dark:bg-slate-900 dark:border-slate-700  bg-white text-sm bg-clip-padding bg-opacity-60 border border-gray-200`}
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-md cursor-pointer"
                                  src={f.imageUrl}
                                  alt={f.title}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="hover:text-indigo-600 dark:hover:text-indigo-600 cursor-pointer dark:text-gray-200  text-gray-800 text-sm font-semibold whitespace-no-wrap">
                                  {f.title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 dark:text-gray-200 dark:bg-slate-900 bg-white text-sm">
                            <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">
                              {f.description}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 dark:border-slate-700 dark:text-gray-200 dark:bg-slate-900 bg-white text-sm">
                            <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap hover:text-indigo-600 dark:hover:text-indigo-600">
                              {f.size}kb
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b dark:bg-slate-900 border-gray-200 dark:border-slate-700 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span className="relative">
                                {" "}
                                <FaShare
                                  onClick={() => setSharePrompt(true)}
                                  className="h-4 w-4 mx-1 cursor-pointer dark:text-gray-200 text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-600"
                                />
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )} */}
                {!listView && (
                  <div className=" flex items-center justify-center">
                    <div className="grid lg:grid-cols-6 md:grid-cols-4  sm:grid-cols-3 grid-cols-2 gap-2">
                      {searchFile.map((f) => (
                        <div
                          className="flex flex-col my-1 gap-1"
                          key={f.title + f._id}
                        >
                          <div href="" className="bg-indigo-500">
                            <img
                              src={f.imageUrl}
                              alt={f.title}
                              className="hover:translate-x-1 h-56 w-48 md:h-64 md:w-48  hover:-translate-y-1 delay-50 duration-100"
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="hover:text-indigo-600 dark:hover:text-purple-500 dark:text-gray-300  text-gray-800 text-sm font-semibold">
                              {" "}
                              {f.title}{" "}
                            </div>
                            <FaShare
                              onClick={() => setSharePrompt(true)}
                              className="h-4 w-4 mx-1 text-gray-500 dark:hover:text-purple-500 dark:text-gray-300 hover:text-indigo-600"
                            />
                          </div>

                          <div className="hover:text-indigo-500 dark:hover:text-purple-500 dark:text-gray-300 text-sm text-gray-500 -mt-1">
                            {" "}
                            {f.size}kb{" "}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Pagination */}
                <Pagination
                  itemsCount={searchFile.length}
                  pageSize={PageSize}
                  onNext={() => setCurrentPage(currentPage + 1)}
                  onPrevious={() => setCurrentPage(currentPage - 1)}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Prompt
        handleOpenClose={uploadPrompt}
        onClose={() => setUploadPrompt(false)}
        message="This file will be private; will not be visible to the public"
      />
      <SharePrompt
        handleOpenClose={sharePrompt}
        onClose={() => setSharePrompt(false)}
        message="You are about to share your private file with another user "
      />
    </div>
  );
};

export default Homepage;
