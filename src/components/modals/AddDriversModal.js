const AddDriversModal = ({setModalDriver}) => (
  <div className="flex flex-col items-center pb-5 w-11/12 max-h-[80vh] bg-white rounded lg:w-1/2">
    <div className="bg-blue-800 text-white rounded flex justify-between px-4 py-1 lg:text-2xl">
      <p className="w-fit">+ Add Driver</p>
      <button className="w-fit font-bold" onClick={() => setModalDriver('modal_inactive')} type="button">X</button>
    </div>
    <div className="flex flex-col px-10 overflow-y-scroll lg:grid lg:grid-cols-2 lg:gap-x-20 lg:px-20 lg:py-5 lg:overflow-hidden">
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">First Name</h4>
        <input name="firstName" type="text" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Last Name</h4>
        <input name="lastName" type="text" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">License Number</h4>
        <input name="licenseNumber" type="number" pattern="\d*" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">License State</h4>
        <input name="licenseState" type="text" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Date of Birth</h4>
        <input name="dateBirth" type="date" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Years of Experience</h4>
        <input name="yearsExperience" type="number" pattern="\d*" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Date of Hire</h4>
        <input name="dateHire" type="date" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Elegibility</h4>
        <input name="elegibility" type="text" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Accidents Total</h4>
        <input name="accidentsTotal" type="number" pattern="\d*" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Violations Total</h4>
        <input name="violationsTotal" type="number" pattern="\d*" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <label className="CostumerMultiStepsLabel">
        <h4 className="w-fit text-xl">Suspensions Total</h4>
        <input name="suspensionsTotal" type="number" pattern="\d*" className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
      </label>
      <button type="button" className="bg-green-700 text-white rounded-2xl mt-4 p-2 lg:col-span-2 lg:mt-8 lg:text-xl "><b>+ Add Driver</b></button>
    </div>
  </div>
);

export default AddDriversModal;
