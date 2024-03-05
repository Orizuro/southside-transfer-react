"use client";

import '.././styles.css'
import data from '../../public/cities.json' assert { type: 'json' };
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';

interface SelectionProps {
  labelText?: string;
  stateValue?: string;
  setStateValue?: Dispatch<SetStateAction<any>>;
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
  const [selectedQuatity, setSelectedQuantity] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  const pricePerPerson = 22.6; // In €

  class Selection extends React.Component<SelectionProps, any> {
    // const string labelText;

    constructor(props: any) {
      super(props);
      this.state = {
        labelText: props.labelText,
        stateValue: props.stateValue,
        setStateValue: props.setStateValue,
      }
    }

    render() {
      return <div className="py-5">
        <label className='text-xl'> {this.state.labelText} </label>

        <select className="select bg-terciary rounded w-full font-semibold" value={this.state.stateValue} onChange={e => this.state.setStateValue(e.target.value)}>
          {getCities().map((citie) =>
            <option key={citie}>{citie}</option>
          )}
        </select>
      </div>
    }
  }

  // A function to check if the checkValues
  // are passed correctly
  function checkValues() {
    console.log(origin);
    console.log(destination);

    // Check if the conselhos are differents
    // if (origin === destination)
    //   setShowError(true);
    // else
    //   setShowError(false);
  }

  function OptionsWithNumbers({ maxPassengers, labelText }: any) {

    var options = [<option defaultValue={"--"} >--</option>];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={i}>{i}</option>);


    return <div className="py-6">
      <label className='text-xl' > {labelText} </label>
      <select className="select bg-terciary rounded w-full font-semibold"
        value={selectedQuatity}
        onChange={e => {
          var value = parseFloat(e.target.value);

          if (isNaN(value)) {
            setIsButtonDisable(true);
            setPrice(0);
            setSelectedQuantity(0);
          }
          else {
            setIsButtonDisable(false);
            setPrice(parseFloat(e.target.value) * pricePerPerson);
            setSelectedQuantity(Number(e.target.value));
          }
        }
        }>
        {options}
      </select>
    </div>
  }

  function ErrorAlert() {
    if (showError)
      return <div role="alert" className="alert alert-error">
        <button className="" onClick={() => setShowError(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <span>Please, select diferrent cities</span>
      </div>
    return null;
  }

  return <>
    <div className="justify-center items-center flex-col">
      <ErrorAlert />

      <Selection labelText='Tranfer from:' stateValue={origin} setStateValue={setOrigin} />

      <Selection labelText='To:' stateValue={destination} setStateValue={setDestination} />

      <OptionsWithNumbers maxPassengers={16} labelText='Quantity of passengers:' />

      <div className="flex-none">
        <text className='text-lg'>Price: {price.toFixed(2)}€</text>
      </div>
    </div>

    <div className='flex justify-center py-8' >
      <button className='btn btn-active bg-black text-whiteBg w-[20%]' onClick={checkValues} disabled={isButtonDisable}>Book now!</button>
    </div>
  </>
}
