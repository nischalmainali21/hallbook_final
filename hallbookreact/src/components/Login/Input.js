const fixedInputClass = `rounded-md appearance-none relative block w-full max-w-sm px-4 py-3  md:mx-auto md:w-2/6 mx-auto

  border border-cprimary-500 placeholder-gray-500 text-cprimary-800 

  focus:outline-none focus:ring-purple-500 focus:border-blue-500 focus:z-10 sm:text-base shadow-sm foucs:shadow-lg `;

function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  labelCustomClass,
}) {
  return (
    
      
      <div className="my-8">
        <label htmlFor={labelFor} className={labelCustomClass}>
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
      </div>
      

      
    

  );
}

export default Input;
