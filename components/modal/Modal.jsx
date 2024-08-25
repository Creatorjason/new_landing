import Image from "next/image";
import React from "react";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ showSuccess, setShowModal, selectedAmount, setSelectedAmount, handleSubmit, amounts }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      {!showSuccess ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-x-3">
              <LiaMoneyBillSolid className="text-2xl text-[#141F1F]" />
              <h2 className="text-sm text-[#141F1F]">Amount to start with</h2>
            </div>
            <button onClick={() => setShowModal(false)} className="hover:text-red-700">
              <MdOutlineClose className="text-2xl text-red-500" />
            </button>
          </div>
          <select
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            className="w-full bg-white text-[#141F1F] text-sm p-2 py-3 mb-4 border rounded"
          >
            <option value="">Select</option>
            {amounts.map((amount) => (
              <option key={amount} className="text-sm text-[#141F1F]" value={amount}>{amount}</option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="flex items-center flex-col text-[#141F1F] text-center">
          <Image src="/confetti.png" alt="Success" width={60} height={60} />
          <h2 className="text-xl font-bold my-4">Peer Bank Account successful</h2>
          <p className="mb-4">Welcome to Granular X. You are a step closer to experiencing our new technology.</p>
          <button
            onClick={() => setShowModal(false)}
            className="py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
          >
            Take me for a spin
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Modal;