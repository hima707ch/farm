import React, { useState } from 'react';
import Button from '@mui/material/Button';

const CitiesSelector = ({setSelectedCities, selectedCities}) => {

  const cities = ['Jaipur', 'Kota', 'Udaipur', 'Pali', 'Jodhpur', 'All'];

  const handleCityToggle = (city) => {
    setSelectedCities((prevSelectedCities) => {
      if (prevSelectedCities.includes(city)) {

        if(city == 'All') return ['All'];

        let temp = prevSelectedCities.filter((selectedCity) => selectedCity !== city);

        if(temp.length == 0) return['All'];

        return temp;
      } else {

        let temp = prevSelectedCities;

        if(city != 'All'){
            temp = temp.filter( c => c != 'All' )
        }

        else{
            temp = [];
        }

        return [...temp, city];
    }
    });
  };

  return (
    <div>
      <h3>Select Cities</h3>
      {cities.map((city) => (
        <Button
          key={city}
          variant={selectedCities.includes(city) ? 'contained' : 'outlined'}
          onClick={() => handleCityToggle(city)}
          style={{ margin: '5px' }}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default CitiesSelector;
