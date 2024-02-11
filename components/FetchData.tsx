"use client";
import SendIcon from "@mui/icons-material/Send";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import puppeteer from "puppeteer";

import { useState } from "react";

export default function FetchData() {
  const [link, setLink] = useState("");

  const linkCheck = (link: string) => {
    const timesOfIndiaRegex = /^https?:\/\/timesofindia\.indiatimes\.com\/.+$/i;
    return timesOfIndiaRegex.test(link);
  };

  const handleSubmit = async () => {
    if (!linkCheck(link)) {
      toast.error("Please add valid TOI link!!");
    } else {
    }
  };

  return (
    <div className="flex text-center justify-center flex-col gap-5">
      {/* Title */}
      <h1 className="font-bold lg:text-6xl md:text-5xl text-3xl md:p-5">
        Grab Your Daily Dose of TOI in Short from
        <br /> with{" "}
        <span className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
          NewsNugget!
        </span>
      </h1>
      {/* description */}
      <p className="md:text-xl text-md">
        Provide the <span className="text-red-500">Times Of India</span> article
        link below !!
      </p>

      {/* input */}
      <div className="p-3 flex gap-3">
        <input
          className="md:p-3 p-2 w-full border-2 border-white rounded-lg text-white bg-transparent outline-none"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste the link"
        />
        <button
          onClick={handleSubmit}
          className="md:py-3 p-2 px-3 bg-orange-500 rounded-lg flex items-center gap-2 font-semibold"
        >
          Submit
          <SendIcon />
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
