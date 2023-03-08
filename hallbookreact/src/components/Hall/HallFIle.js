import React, { useState } from "react";
import CButton from "../CButton";

function HallFIle() {
  const [file, setFile] = useState();

  const btnDEsc1 = (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
    </div>
  );

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleUpload() {
    if (!file) {
      console.log("no file");
      return;
    }
    console.log(file.type);
    console.log(file.size);
  }

  return (
    <div className="my-6 max-w-[500px]">
      <label className="flex flex-col">
        <span className="text-base font-bold">Event Details File:</span>
        <div className="flex items-center justify-start">
          <input
            type="file"
            id="eventDetails"
            name="eventDetails"
            onChange={handleFileChange}
            required
            className="max-w-[300px] rounded-md border border-cprimary-500 px-4 py-3 text-cprimary-800 shadow-sm"
          />

          <CButton
            id="fileUploader"
            type="button"
            btnDesc={btnDEsc1}
            onClick={handleUpload}
          />
        </div>
      </label>
    </div>
  );
}

export default HallFIle;
