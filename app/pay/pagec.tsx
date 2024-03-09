"use client";
import Script from 'next/script';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import '@googlemaps/extended-component-library/place_picker.js';
interface SelectionProps {
  labelText?: string;
  stateValue?: string;
  setStateValue?: Dispatch<SetStateAction<any>>;
}
export default function MapComponent() {

  interface PlacesAutocompleteProps {
    callbackName: string;
    requestOptions?: object;
    debounce?: number;
    onSelect: (description: string) => void; // Callback function to handle selection
  }

  const PlacesAutocomplete: FC<PlacesAutocompleteProps> = ({
    callbackName,
    requestOptions,

    debounce = 300,
    onSelect,
  }) => {
    const [selectedDescription, setSelectedDescription] = useState('');
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      callbackName,
      requestOptions,//: {/*language: "pt",*/types: ['airport',],/* componentRestrictions: { country: ["Pt"] },*/ locationBias: { lat: 37.0880433, lng: -8.1330529, radius: 60000 } }, //locationBias: { lat: 37.0880433, lng: -8.1330529 /*, radius: 60000 */ } },
      debounce,
      initOnMount: false
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleSelect = (suggestion: any) => () => {
      const { description } = suggestion;
      setValue(description, false);
      clearSuggestions();
      setSelectedDescription(description);

      // Get latitude and longitude via utility functions
      // Example:
      // getGeocode({ address: description })
      //   .then((results) => getLatLng(results[0]))
      //   .then(({ lat, lng }) => {
      //     console.log('Coordinates:', { lat, lng });
      //   })
      //   .catch((error) => {
      //     console.log('Error getting coordinates:', error);
      //   });

      onSelect(description);
    };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div>
        <input
          value={selectedDescription || value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />
        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        {selectedDescription && <p>Selected Description: {selectedDescription}</p>}
      </div>
    );
  };

  const [selectedDescription, setSelectedDescription] = useState('');

  const handleSelectDescription = (description: string) => {
    setSelectedDescription(description);
  };
  return <div>


    <script
      async
      src="https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=YOUR_CALLBACK_NAME"
    ></script>
    <div>
      <PlacesAutocomplete
        callbackName="YOUR_CALLBACK_NAME"
        debounce={300}
        onSelect={handleSelectDescription} // Pass the callback function to handle selection
      />

      <p>Selected Description: {selectedDescription}</p>
    </div>
  </div>




}