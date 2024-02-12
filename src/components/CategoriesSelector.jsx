import React, { useState } from 'react';
import Button from '@mui/material/Button';

const CategoriesSelector = ({setSelectedcategories, selectedcategories}) => {

  const categories = ['Tractor', 'Vechiel', 'Trolly', 'Harvestor', 'Cultivator', 'Rotavator', 'Seed drill', 'All'];

  const handlecategoryToggle = (category) => {
    setSelectedcategories((prevSelectedCategory) => {
      if (prevSelectedCategory.includes(category)) {

        if(category == 'All') return ['All'];

        let temp = prevSelectedCategory.filter((cat) => cat !== category);

        if(temp.length == 0) return['All'];

        return temp;

      } else {

        let temp = prevSelectedCategory;

        if(category != 'All'){
            temp = temp.filter((cat) => cat != 'All');
        }

        else{
            temp = [];
        }

        return [...temp, category];
      }
    });
  };

  return (
    <div>
      <h3>Select Categories</h3>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedcategories.includes(category) ? 'contained' : 'outlined'}
          onClick={() => handlecategoryToggle(category)}
          style={{ margin: '5px' }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoriesSelector;
