import React, { useState } from "react";

const QtyButton = ({ max }) => {
  const [value, setValue] = useState(1);

  const decrement = () => setValue(value > 0 ? value - 1 : 0);
  const increment = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-l-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
        onClick={decrement}
      >
        <span className="m-auto text-2xl font-normal">-</span>
      </button>
      <input
        type="text"
        className="px-2 w-14 text-center align-middle text-slate-900 bg-transparent border-0 border-y-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
        value={value}
        max={max}
        readOnly
      />
      <button
        type="button"
        className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-r-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
        onClick={increment}
      >
        <span className="m-auto text-2xl font-normal">+</span>
      </button>
    </div>
  );
};

export default QtyButton;
