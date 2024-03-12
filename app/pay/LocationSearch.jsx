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
        console.log('Success', address);
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
          <div className='py-5'>
            <label class="text-2xl font-semibold "> {this.props.label} </label>
            <input
              {...getInputProps({

                placeholder: this.props.placeHolder,
                className: 'select bg-blueLight rounded w-[60%] font-medium mt-2 text-black ',
              })}
            />
            <div className="autocomplete-dropdown-container ">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active  p-3 border '
                  : 'suggestion-item p-3 border';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#f2f3fa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span className=' bg.green'>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
