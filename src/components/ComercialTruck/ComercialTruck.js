import { useNavigate } from 'react-router-dom';
import truck from '../../images/truck2tiny.png';
import producerImage from '../../images/Stephen-smtiny.png';

const CommercialTruck = () => {
  const navigate = useNavigate();
  const routeChange = () =>{ 
    navigate('/finalize');
  };
  const numberWithCommas = (x) => {
    return x.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <div className="flex flex-col items-center text-xl font-bold">
        <p>Commercial Trucking Quote for:</p>
        <p className="mt-2">T AND D TRANSPORTATION</p>
      </div>
      <div className="w-11/12 mt-4 flex self-start">
        <img src={truck} alt="truck" className="w-5/12" />
        <div className="w-7/12 bg-yellow-200 font-bold flex flex-col justify-center items-center">
          <p className='mb-1 mt-2 text-xs'>Estimated Monthly Premium</p>
          <p className='text-2xl'>${numberWithCommas(1259)}</p>
          <p className='text-xs italic mt-auto mb-1'>or ${numberWithCommas(689)} per truck</p>
        </div>
      </div>
      <div className='w-11/12 text-xs mt-8 border-b-2 border-black'>
        <div className='bg-[#012060] text-white text-left p-2 font-bold'>
          <p>Quote Prepared For</p>
        </div>
        <div className='px-2 py-1 flex bg-[#f2f2f2]'>
          <p className='w-1/3 text-left font-bold'>Insured Name</p>
          <p className='w-2/3 text-right'>T AND D TRANSPORTATION</p>
        </div>
        <div className='px-2 py-1 flex'>
          <p className='w-1/5 text-left font-bold'>Address</p>
          <p className='w-4/5 text-right'>22126 Nobles Crossing Dr, Spring, TX 77373</p>
        </div>
        <div className='px-2 py-1 flex bg-[#f2f2f2]'>
          <p className='w-2/3 text-left font-bold'>Fleet Size</p>
          <p className='w-1/3 text-right'>6</p>
        </div>
        <div className='px-2 py-1 flex'>
          <p className='w-2/3 text-left font-bold'>Number of Drivers</p>
          <p className='w-1/3 text-right'>10</p>
        </div>
      </div>
      <div className='w-11/12 text-xs mt-4 border-b-2 border-black'>
        <div className='bg-[#012060] text-white text-left p-2 font-bold flex justify-between'>
          <p className='w-fit'>Coverages</p>
          <p className='w-fit'>Coverage Limits</p>
        </div>
        <div className='px-2 py-1 flex bg-[#f2f2f2]'>
          <p className='w-1/2 text-left font-bold'>Auto Liability</p>
          <p className='w-1/2 text-right'>$1,000,000</p>
        </div>
        <div className='px-2 py-1 flex'>
          <p className='w-1/2 text-left font-bold'>Physical Damage</p>
          <p className='w-1/2 text-right'>Included</p>
        </div>
        <div className='px-2 py-1 flex bg-[#f2f2f2]'>
          <p className='w-1/2 text-left font-bold'>Motor Truck Cargo</p>
          <p className='w-1/2 text-right'>$100,000</p>
        </div>
        <div className='px-2 py-1 flex'>
          <p className='w-1/2 text-left font-bold'>General Liability</p>
          <p className='w-1/2 text-right'>$1,000,000</p>
        </div>
      </div>
      <div className='flex w-11/12 mt-4 bg-[#dae3f3] font-bold'>
        <img src={producerImage} alt="CoverWhale logo" className='w-1/5' />
        <div className='w-4/5 flex flex-col justify-between items-center py-2 px-1'>
          <div className='italic text-[6px]'>
            <p>“Hey there! This is Stephen Langford at American Fleet - America’s #1 Fleet Insurance Broker. I‘d love the opportunity to earn your business. Please contact me today with any questions or to get started.”</p>
          </div>
          <p className='text-xs'>(817)242-5008 | Stephen@TeamAFI.com</p>
        </div>
      </div>
      <div className='flex flex-col items-center my-2 text-[#77727d] text-[6px] italic'>
        <p>Your actual premium may be higher or lower based on a number of factors. Coverages and discounts are subject to policy terms, conditions, qualifications, and availability. This proposal does not contain all possible coverage options and is only intended to highlight some of your coverage options. Please contact American Fleet to further discuss all of the additional coverage options which may be available.</p>
      </div>
      <button type='button' onClick={routeChange} className='w-11/12 py-2 px-8 bg-red-700 text-white font-bold mt-auto mb-10 rounded-3xl'>FINALIZE QUOTE</button>
    </div>
  );
};

export default CommercialTruck;
