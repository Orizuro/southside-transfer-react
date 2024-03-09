"use client";

import '.././styles.css'
import data from '../../public/cities.json' assert { type: 'json' };
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import FormElement from '../components/forms';
import '@googlemaps/extended-component-library/place_picker.js';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { PlacePicker } from '@googlemaps/extended-component-library/react';

import * as GMPX from '@googlemaps/extended-component-library/react';
export default function CheckOut() {



  function Payment() {

    return <fieldset>

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-x-3">
          <input
            required
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
  }


  class FormClass extends React.Component {
    // const string labelText;



    render() {
      var options = [<option defaultValue={"--"} >--</option>];
      for (var i = 1; i <= 16; i++)
        options.push(<option key={i}>{i}</option>);
      return <form action={"post"} >

        <GMPX.APILoader apiKey={"AIzaSyAt5idFArVSd46-m2i6TS7L4wiONUzUYwI"} />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <FormElement htmlFor='first-name' label='First Name' type='text' name='first-name' id='fist-name' autoComplete='given-name' colSpan='3' />

            <FormElement htmlFor='last-name' label='Last Name' type='text' name='last-name' id='last-name' autoComplete='family-name' colSpan='3' />

            <FormElement htmlFor='email' label='Email Address' type='email' name='email' id='email' autoComplete='email' colSpan='4' placeholder='example@gmail.com' />

          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Trip details</h2>
          <br />
          <div>

            <PlacePicker placeholder='Address departure' id='addressDeparture' style={{ width: "100%" }} country={["pt"]} locationBias={{ lat: 37.0880433, lng: -8.1330529 }} radius={60000}>
              <input name="address" type="hidden" id="selected-address" />
            </PlacePicker>

          </div>
          <br />
          <div>

            <PlacePicker placeholder='Address arrival' id='addressArrival' style={{ width: "100%" }} country={["pt"]} locationBias={{ lat: 37.0880433, lng: -8.1330529 }} radius={60000}>
              <input name="address" type="hidden" id="selected-address" />

            </PlacePicker>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">




            <FormElement htmlFor='date' label='Date of pickup' type='date' name='date' id='date' colSpan='2' />

            <FormElement htmlFor='time' label='Time of pickup' type='time' name='time' id='time' colSpan='2' />
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
                <select
                  id="numberLuggage"
                  name="numberLuggage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
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
          <Payment></Payment>
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
              Im agree with "Terms and conditions"
            </label>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form >
    }

  }
  return (
    <>
      <div className=' m-3'>
        <script type="module" src="https://unpkg.com/@googlemaps/extended-component-library"></script>
        <h1 className=' font-semibold text-2xl'> Final steps</h1>
        <br />
        <p className=' border-b border-gray-900/10 pb-4'> We just need some more information to finish the reservation.</p>
        <FormClass />
      </div>

    </>
  )
}
