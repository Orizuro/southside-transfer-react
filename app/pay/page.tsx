// "use client";

import '.././styles.css'
import data from '../../public/cities.json' assert { type: 'json' };

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

function Selection({ labelText }: Props) {
  return <div className="py-6">
    <label> {labelText} </label>

    <select className="select bg-terciary rounded w-full">
      {getCities().map((citie) =>
        <option key={citie}>{citie}</option>
      )}
    </select>
  </div>
}

function OptionsWithNumbers({ maxPassengers, labelText }: Props) {

  var options = [];
  for (var i = 1; i <= Number(maxPassengers); i++)
    options.push(<option key={i} >{i}</option>);


  return <div className="py-6">
    <label> {labelText} </label>

    <select className="select bg-terciary rounded w-full">
      {
        options
        // Array.from({ length: Number(maxPassengers) }).map((it, index) => <option key={index} >{index}</option>)
      }
    </select>
  </div>

}

export default function Pay() {
  return <div className="justify-center items-center flex-col">
    <Selection labelText='Tranfer from:' />

    <Selection labelText='To:' />

    <OptionsWithNumbers maxPassengers={16} labelText='Quantity of passengers:' />

    <div className="flex-none">
      <text>Price: 135€</text>
    </div>

    <button className='flex btn btn-active bg-black text-whiteBg justify-center'>Book</button>

  </div>
}
