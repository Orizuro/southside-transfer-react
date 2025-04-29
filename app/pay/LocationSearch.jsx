"use client";
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
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
            searchOptions={{ componentRestrictions: { country: 'pt' } }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='w-full'>
                <label className="text-xl font-semibold">{this.props.label}</label>
                <div>
                  <input
                      {...getInputProps({
                        placeholder: this.props.placeHolder,
                        className: ' rounded-lg p-3 font-medium text-black w-full',
                      })}
                  />
                </div>
                <div className='relative z-50'>
                  <div className='absolute w-full top-2 rounded-lg  bg-gray-300  shadow-2xl shadow-black'>
                    {loading && <div className='p-3'>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                          ? 'suggestion-item--active p-2 hover:bg-[#F8F9F9]'
                          : 'suggestion-item p-2 ';
                      const style = suggestion.active
                          ? { backgroundColor: '#f2f3fa', cursor: 'pointer' }
                          : { backgroundColor: '#f2f3fa', cursor: 'pointer' };

                      // Destructure key from suggestionItemProps
                      const { key, ...suggestionItemProps } = getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      });

                      return (
                          <div key={suggestion.placeId} className='p-2'>
                            <div {...suggestionItemProps}>
                              <span>{suggestion.description}</span>
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </div>
          )}
        </PlacesAutocomplete>

    );
  }
}

export default LocationSearchInput;
