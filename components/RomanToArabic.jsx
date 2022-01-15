import { useState } from "react";
import { RomanToArabicConverter } from "../utils/converter";

export const RomanToArabic = () => {
  const [val, setVal] = useState(null);
  const [res, setRes] = useState(null);
  const [input, setInput] = useState(null);

  const handleClick = () => {
    setRes(RomanToArabicConverter(input));
    setVal(input);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="h-auto bg-blue-50 p-4">
      <p className="text-4xl pb-2 text-center">Roman To Arabic</p>
      <div className="flex justify-center">
        <input type="text" className="border-2 w-72" onChange={handleChange} />
        <button className="w-24 border-2 ml-4" onClick={handleClick}>
          convert!
        </button>
      </div>
      {res ? (
        <h2 className=" text-4xl text-red-500 text-center">
          {val + "   :   " + res}
        </h2>
      ) : null}
    </div>
  );
};
