"use client";
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import LocationSearchInput from './LocationSearch';
//import DistanceMatrixService from './DistanceMatrixService';

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {


    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [selectedQuatity, setSelectedQuantity] = useState(0);
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const [price, setPrice] = useState(0.0);
    const pricePerKilometer = 0.7;

    function calculatePricePerson(numPassengersStr: string): number {
        const numPassengers = parseFloat(numPassengersStr);
        const basePriceUpTo5 = 20;
        const basePriceUpTo10 = 30;
        const pricePerPassenger = 10; // Assuming 10€ for each additional passenger beyond 8

        if (numPassengers <= 4) {
            return basePriceUpTo5;
        } else if (numPassengers <= 8) {
            return basePriceUpTo10;
        } else {
            return basePriceUpTo10 + pricePerPassenger * (numPassengers - 8);
        }
    }

    function OptionsWithNumbers({ maxPassengers, labelText }: any) {

        var options = [<option defaultValue={"--"} >--</option>];
        for (var i = 1; i <= Number(maxPassengers); i++)
            options.push(<option key={i}>{i}</option>);


        return <div className="py-6">
            <label className='text-2xl font-semibold' > {labelText} </label>
            <select className="select bg-blueLight rounded w-full font-medium mt-2"
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
                        setPrice(calculatePricePerson(e.target.value) + (parseFloat(distance) / 1000) * pricePerKilometer);
                        setSelectedQuantity(Number(e.target.value));
                    }
                }
                }>
                {options}
            </select>
        </div>
    }
    const secretKey = process.env.GOOGLE_SECRET_KEY;
    const scriptText: string = "https://maps.googleapis.com/maps/api/js?key=" + secretKey + "&libraries=places"

    return (
        <div className='justify-center items-center flex-col m-5'>
            <script src={scriptText}></script>
            <h1>Map Component</h1>
            <div className=''>
                <LocationSearchInput label={"From :"} placeHolder={"Type your address or location "} onSelectAddress={(address: string) => setOrigin(address)} />

            </div>
            <LocationSearchInput onSelectAddress={(address: string) => setDestination(address)} />
            <p>Selected Origin: {origin}</p>
            <p>Selected Destination: {destination}</p>

            <DistanceMatrixService

                options={{
                    destinations: [origin],
                    origins: [destination],
                    travelMode: 'DRIVING'
                }}
                callback={(response: any) => { setDistance(response.rows[0].elements[0].distance.value) }}
            />
            <p>Distance: {distance}</p>
            <OptionsWithNumbers maxPassengers={16} labelText='Quantity of passengers:'></OptionsWithNumbers>
            <div className="flex-none text-center mt-5">
                <text className='text-3xl font-semibold'>Price: {price.toFixed(2)}€</text>
            </div>
        </div>
    );
};

export default MapComponent;
