"use client";

import '.././styles.css'
import { useCallback, useState } from 'react';
import React from 'react';
import FormElement from '../components/forms';
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'



const PaymentPage = () => {
  var data;
  if (typeof window !== 'undefined') {
    data = localStorage.getItem("paymentInfo") ? JSON.parse(localStorage.getItem("paymentInfo")) : null;
  } else
    data = {}


  // const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

  const router = useRouter();
  const cancel = useCallback(() => {
    router.push("/pay");
  }, [router]);

  const origin = data.origin; // searchParams.get("origin");
  const destination = data.destination //searchParams.get("destination");
  // const searchParams = useSearchParams()
  const [nameFirst, setNameFirst] = useState<string>('');
  const [nameLast, setNameLast] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [numberLuggage, setNumberLuggage] = useState(0);
  const [payment, setPayment] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const [isNameValid, setIsNameValid] = useState(true);

  // const [inputValue2, setInputValue2] = useState<string>('');

  const formInfo = {
    "fistName": nameFirst,
    "lastName": nameLast,
    "email": email,
    "pickupDate": date,
    "pickupTime": time,
    "totalLuggage": numberLuggage,
    "paymentType": payment,
    "additionalInfo": "",
    "origin": origin,
    "destination": destination,
  }

  var options = [<option key={0} defaultValue={"--"} >--</option>];
  for (var i = 1; i <= 16; i++)
    options.push(<option key={i}>{i}</option>);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Do something with the input value stored in 'inputValue1'
    e.preventDefault();
    console.log('Input value 1:', nameFirst);
    console.log('Input value 2:', nameLast);
    console.log('Input value 3:', email);
    console.log('Input value 4:', date);
    console.log('Input value 5:', time);
    console.log('Input value 6:', numberLuggage);
    console.log('Input value 7:', payment);

    if (checkIfIsNameValid()) {
      localStorage.clear();
      localStorage.setItem("formInfo", JSON.stringify(formInfo));
      checkout();
    }

  };

  async function checkout() {

    if (payment == "online") {

      const { data } = await axios.post(
        "/stripe/api",
        {
          priceId: 100
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      window.location.assign(data);
    }
    return redirect("/sucess");


    // const data = await fetch('/stripe/api', {

    //     method: "POST",
    //     headers: {
    //     },
    //     body: JSON.stringify({ item: "some" })
    // }
    // ).then((data) => data.json());
  }

  function cancelForm() {
    cancel();
    localStorage.clear();
  }

  if (!origin || !destination) {
    // Redirect to payment page
    return redirect("/pay");
  }

  function isEmailValid() { }

  function checkIfIsNameValid() {
    var isValid = !/\d/.test(nameFirst);
    setIsNameValid(isValid);
    return isValid;
  }

  return (
    <>
      <div className=' m-3'>
        <h1 className=' font-semibold text-2xl'> Final steps</h1>
        <br />
        <p className=' border-b border-gray-900/10 pb-4'> We just need some more information to finish the reservation.</p>
        <form onSubmit={handleSubmit} >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <FormElement
                inputValue={nameFirst}
                onInputChange={(e) => setNameFirst(e)}
                onSubmit={() => { }}
                label='First Name'
                type='text'
                autoComplete='given-name'
                errorMessage='Invalid Name'
                showError={!isNameValid}
              />

              <FormElement
                inputValue={nameLast}
                onInputChange={(e) => setNameLast(e)}
                onSubmit={() => { }}
                label='Last Name'
                type='text'
                autoComplete='family-name'
              />

              <FormElement
                inputValue={email}
                onInputChange={(e) => setEmail(e)}
                onSubmit={() => { }}
                label='Email Address'
                type='email'
                autoComplete='email'
                placeholder='example@gmail.com' />

              <div className="sm:col-span-4">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>

                <PhoneInput
                  inputProps={{
                    className: 'block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  }}
                  country={'pt'}
                  onChange={setPhoneNumber}
                  enableSearch={true}
                />
              </div>

            </div>

          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Trip details</h2>
            <br />
            <div>
              <h1> From:</h1>
              <p> {origin}</p>
            </div>
            <br />
            <div>
              <h1> To: </h1>
              <p> {destination}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <FormElement
                inputValue={date}
                onInputChange={(e) => setDate(e)}
                onSubmit={() => { }}
                label='Date of pickup'
                type='date'
              />

              <FormElement
                inputValue={time}
                onInputChange={(e) => setTime(e)}
                onSubmit={() => { }}
                label='Time of pickup'
                type='time'
              />
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">

            <h2 className="text-base font-semibold leading-7 text-gray-900">Luggage</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">

              <div className="sm:col-span-1">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium leading-6 text-gray-900">Number of Suitcases</label>
                <div className="mt-2">
                  <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={numberLuggage}
                    onChange={e => {
                      var value = parseInt(e.target.value);
                      if (isNaN(value)) {

                        setNumberLuggage(0);
                      }
                      else {
                        setNumberLuggage(Number(e.target.value));
                      }
                    }

                    }>
                    {options}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"> Any additional information </label>
                <div className="mt-2">
                  <textarea
                    id="aboutLuggage"
                    name="aboutLuggage"
                    rows={2}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">

            <h2 className="text-base font-semibold leading-7 text-gray-900">Payment</h2>
            <fieldset>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    required
                    onChange={(e) => setPayment(e.target.value)}
                    value="driver"
                    name="paymentOption"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="driver"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Pay to the driver
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    required
                    onChange={(e) => setPayment(e.target.value)}
                    value="online"
                    name="paymentOption"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="online"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Pay online
                  </label>
                </div>
              </div>

            </fieldset>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                required
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>

            <div className="text-sm leading-6">
              <label htmlFor="candidates"
                className="font-medium text-gray-900">
                I agree with &quot;Terms and conditions&quot;
              </label>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="btn btn-error text-sm font-semibold leading-6 text-whiteBg" onClick={cancelForm}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-whiteBg shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>
          </div>
        </form >
      </div>

    </>
  )
}
export default PaymentPage;
