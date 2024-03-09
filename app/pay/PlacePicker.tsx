import React from 'react';
import { PlacePicker } from '@googlemaps/extended-component-library/react';

interface CollegePickerProps {
    className?: string;
    forMap?: boolean;
    onCollegeChange: (college: string) => void;
}

export const CollegePicker: React.FC<CollegePickerProps> = ({
    className,
    forMap,
    onCollegeChange,
}) => {
    return (
        <PlacePicker
            className={className}
            country={['us', 'ca']}
            placeholder="Enter a college in the US or Canada"

            onPlaceChange={(e: any) => {
                onCollegeChange(e.target.value);
            }}
        />
    );
};
