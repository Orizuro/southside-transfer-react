"use client";
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.label = { label: '' }
    this.placeHolder = { placeHolder: "" }
    this.destination = '';
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.onSelectAddress(address); // Pass the selected address to the parent component
        this.destination = address;
        if (this.props.onAfterSelect) {
          this.props.onAfterSelect(address, this.destination); // Call the callback after address selection with both address and destination
        }
      })
      .catch(error => console.error('Error', error));
  };


  render() {

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{ componentRestrictions: { country: "pt" } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className=' w-full  '>
            <label className="text-xl font-semibold "> {this.props.label} </label>
            <div>
              <input
                {...getInputProps({
                  placeholder: this.props.placeHolder,
                  className: 'rounded-xl font-medium text-black w-full',
                })}
              />

            </div>
            <div className='relative '>
              <div className=' absolute w-full top-2  rounded-xl bg-whiteBg shadow-2xl shadow-black'>
                {loading && <div className='p-3'>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active p-2 hover:bg-[#F8F9F9] rounded-xl'
                    : 'suggestion-item p-2 ';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#f2f3fa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div className=' p-2'>

                      <div
                        //key={suggestion}  
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,

                        })}
                      >
                        <span className=''>{suggestion.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
        }
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
