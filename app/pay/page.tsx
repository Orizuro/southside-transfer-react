"use client";

import '.././styles.css'
import data from '../../public/cities.json' assert { type: 'json' };
import { useState } from 'react';

interface Props {
  labelText?: string;
  maxPassengers?: Number;
}

function getCities() {
  // var obj = JSON.parse(JSON.stringify(data.cities));
  // obj = JSON.stringify(data.cities);
  //
  var names = [];
  for (var i = 0; i < data.cities.length; i++) {
    names[i] = data.cities[i].name;
  }
  return names;
}

export default function Pay() {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [showError, setShowError] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [selectedQuatity, setSelectedQuantity] = useState(1);

  const pricePerPerson = 22.6; // In €

  function Selection({ labelText }: Props) {
    return <div className="py-5">
      <label> {labelText} </label>

      <select className="select bg-terciary rounded w-full">
        {getCities().map((citie) =>
          <option key={citie}>{citie}</option>
        )}
      </select>
    </div>
  }

  // A function to check if the checkValues
  // are passed correctly
  function checkValues() {
    // Check if the conselhos are differents

    setShowError(!showError);
  }

  function OptionsWithNumbers({ maxPassengers, labelText }: Props) {

    var options = [];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={"s" + i} value={i} >{i}</option>);


    return <div className="py-6">
      <label> {labelText} </label>
      <select className="select bg-terciary rounded w-full"
        value={selectedQuatity}
        onChange={e => {
          setPrice(parseFloat(e.target.value) * pricePerPerson);
          setSelectedQuantity(Number(e.target.value))
        }
        }>
        {options}
      </select>
    </div>
  }

  function ErrorAlert() {
    if (showError)
      return <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Task failed successfully.</span>
        <button className="btn btn-sm" onClick={() => setShowError(false)}>Close</button>
      </div>
    return null;
  }

  return <div className="justify-center items-center flex-col">
    <ErrorAlert />
    <Selection labelText='Tranfer from:' />

    <Selection labelText='To:' />

    <OptionsWithNumbers maxPassengers={16} labelText='Quantity of passengers:' />

    <div className="flex-none">
      <text>Price: {price.toFixed(2)}€</text>
    </div>

    <button className='flex btn btn-active bg-black text-whiteBg justify-center' onClick={checkValues}>Book</button>

  </div>
}
