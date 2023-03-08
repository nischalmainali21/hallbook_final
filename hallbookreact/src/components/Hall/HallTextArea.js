import React, { useState } from "react";

function HallTextArea({textInputState}) {
  let tempValue
  if(!textInputState){
    tempValue = ""
  }
  else{
    tempValue = textInputState
  }
    const [textInput, setTextInput] = useState(tempValue);

  

  function handleChange(e) {
    setTextInput(e.target.value);
  }

  console.log(textInput);

  return (
    <div className="my-6 max-w-[500px]">
      <label className="flex flex-col">
        <span className="text-base font-bold">Event Description</span>
        <textarea
          id="eventDesc"
          name="eventDesc"
          rows="10"
          cols="50"
          placeholder="Brief Event Description"
          value={textInput}
          onChange={handleChange}
          minLength="1"
          maxLength="250"
          className="foucs:border-blue-500 appearance-none rounded-md border border-cprimary-500 px-4
                        py-3 text-cprimary-800 placeholder-gray-500 shadow-sm 
                        focus:z-10 focus:shadow-lg focus:outline-none focus:ring-purple-500 sm:text-base"
        ></textarea>
      </label>
    </div>
  );
}

export default HallTextArea;
