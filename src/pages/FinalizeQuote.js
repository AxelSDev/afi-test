import { useState } from "react";

const FinalizeQuote = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, "1500");

  return (
    <div className="text-left w-11/12 text-lg">
      <p className="mb-4">Judge, we just emailed and texted you a pdf of the quote.</p>
      <b className="text-xl">Here are the next steps to finalize your quote.</b>
      <div className="mt-4 w-fit flex items-center font-bold text-2xl py-2 px-4 text-blue-900 border-blue-900 rounded-full border-2">1</div>
      <p>Please gather the following:</p>
      <ul className="pl-6">
        <li className="italic list-disc">The VIN numbers for all 4 trucks.</li>
        <li className="italic list-disc">The drivers license numbers, state, and DOB for your 4 drivers.</li>
      </ul>
      <div className="mt-4 w-fit flex items-center font-bold text-2xl py-2 px-4 text-blue-900 border-blue-900 rounded-full border-2">2</div>
      <p>An agent from our team will reach out to you soon to get the above information from you to finalize the quote.</p>
      <div className="mt-4 w-fit flex items-center font-bold text-2xl py-2 px-4 text-blue-900 border-blue-900 rounded-full border-2">3</div>
      <p>Your agent will present a final quote and get you insured.</p>
      <div className="my-4">
        <b className="text-red-700">For immediate insurance needs:</b>
        <p><b>Call:</b> 817-242-5008</p>
        <p><b>Email:</b> quotes@teamafi.com</p>
      </div>
      { loading && (
        <div className="loader">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default FinalizeQuote;
