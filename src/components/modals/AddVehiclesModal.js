import { useState } from "react";

const AddVehiclesModal = ({setModalVehicle, vehiclesArray, setVehiclesArray}) => {
  const [vehicle, setVehicle] = useState(
    {
      vin: '',
      vehicleyear: '',
      make: '',
      model: '',
      value: ''
    }
  );
  const [error, setError] = useState(false);
  const handleVehicleChange = (event) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setVehicle((prevState)=> {
      return({
        ...prevState,
        [inputName]: newValue,
      });
    });
  }
  const addVehicle = () => {
    if (Object.values(vehicle).some((element) => element === '')) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    } else {
      setVehiclesArray([...vehiclesArray, vehicle]);
      setVehicle(
        {
          vin: '',
          vehicleyear: '',
          make: '',
          model: '',
          value: ''
        }
      );
      setModalVehicle('modal_inactive');
    }
  };

  return (
    <div className="flex flex-col items-center pb-5 w-11/12 max-h-[80vh] bg-white rounded lg:w-1/2">
      <div className="bg-blue-800 text-white rounded flex justify-between px-4 py-1 lg:text-2xl">
        <p className="w-fit">+ Add Vehicle</p>
        <button className="w-fit font-bold" onClick={() => setModalVehicle('modal_inactive')} type="button">X</button>
      </div>
      <div className="flex flex-col px-10 pb-10 overflow-y-scroll lg:grid lg:grid-cols-2 lg:gap-x-20 lg:px-20 lg:py-5 lg:overflow-hidden">
        <label className="CostumerMultiStepsLabel">
          <h4 className="w-fit pl-4 text-xl">VIN</h4>
          <input name="vin" type="text" onChange={handleVehicleChange} value={vehicle.vin} className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
        </label>
        <label className="CostumerMultiStepsLabel">
          <h4 className="w-fit pl-4 text-xl">Year</h4>
          <input name="vehicleyear" type="number" pattern="\d*" onChange={handleVehicleChange} value={vehicle.vehicleyear} className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
        </label>
        <label className="CostumerMultiStepsLabel">
          <h4 className="w-fit pl-4 text-xl">Make</h4>
          <input name="make" type="text" onChange={handleVehicleChange} value={vehicle.make} className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
        </label>
        <label className="CostumerMultiStepsLabel">
          <h4 className="w-fit pl-4 text-xl">Model</h4>
          <input name="model" type="text" onChange={handleVehicleChange} value={vehicle.model} className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1"  />
        </label>
        <label className="CostumerMultiStepsLabel">
          <h4 className="w-fit pl-4 text-xl">Value</h4>
          <input name="value" type="number" pattern="\d*" onChange={handleVehicleChange} value={vehicle.value} className="bg-white border-2 border-slate-300 rounded-3xl px-4 py-1" />
        </label>
        <div className="mt-4 lg:col-span-2 lg:mt-8 lg:text-xl flex flex-col items-center lg:flex-col-reverse">
          <button type="button" onClick={addVehicle} className="bg-green-700 text-white rounded-xl p-2 lg:w-3/4"><b>+ Add Vehicle</b></button>
          {error && <span className="text-red-800 font-bold">Please fill all the inputs</span>}
        </div>
      </div>
    </div>
  );
};

export default AddVehiclesModal;
