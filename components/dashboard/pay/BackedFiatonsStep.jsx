import React, { useState } from 'react';

const BackedFiatonsStep = ({ onDone }) => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <h3 className="text-base font-semibold mb-4">What kind of backed fiatons would you like to create?</h3>
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="Naira Backed"
            checked={selected === 'Naira Backed'}
            onChange={(e) => setSelected(e.target.value)}
            className="mr-2"
          />
          Naira Backed
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="Dollar Backed"
            checked={selected === 'Dollar Backed'}
            onChange={(e) => setSelected(e.target.value)}
            className="mr-2"
          />
          Dollar Backed
        </label>
      </div>
      <button
        className="w-full bg-[#141F1F] text-white py-2 rounded-md dark:shadow dark:shadow-[#7df8ff3d]"
        onClick={onDone}
        disabled={!selected}
      >
        Done
      </button>
    </div>
  );
};

export default BackedFiatonsStep;