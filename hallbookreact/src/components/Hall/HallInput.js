import React from "react";

const HallInpputClass = `hallinputclass `

function HallInput({
  labelText,
  id,
  name,
  type,
  inputmode,
  pattern,
  value,
  isRequired,
  placeholder,
  customClass,
  handleChange,
  optionList,
  optionListName,
  minLength,
  maxLength
}) {
  
  

  return (

    
    <div className="my-6 max-w-[500px]">
      <label className="flex flex-col gap-1">
        <span className="text-base font-bold ">{labelText}</span>
        <div className="flex items-center gap-2">
        <input
          id={id}
          name={name}
          type={type}
          inputMode={inputmode}
          value={value}
          required={isRequired}
          onChange={handleChange}
          className={HallInpputClass + customClass}
          placeholder={placeholder}
          pattern={pattern}
          list={optionListName}
          minLength={minLength}
          maxLength={maxLength}
        ></input>
        <span></span>
        </div>
      </label>
      {
        optionList == null ? null: (
          <datalist id={optionListName}>
            {optionList.map((option) => (
              <option key = {option} value={option}></option>
            ))}
          </datalist>
        )
      }
      
    </div>
  );
}

export default HallInput;
