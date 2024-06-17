import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Typography,
} from '@mui/material';

const Filter = ({ onFilterChange, manufacturers, categories }) => {
  const [filters, setFilters] = useState({
    producers: {},
    priceFrom: '',
    priceTo: '',
    categories: {},
  });

  const previousFiltersRef = useRef(filters);

  const debouncedOnFilterChange = useCallback(debounce(onFilterChange, 300), [onFilterChange]);

  useEffect(() => {
    if (manufacturers.length > 0) {
      const manufacturersData = manufacturers.reduce((acc, manufacturer) => {
        acc[manufacturer] = false;
        return acc;
      }, {});
      setFilters((prevFilters) => ({
        ...prevFilters,
        producers: manufacturersData,
      }));
    }
  }, [manufacturers]);

  useEffect(() => {
    if (categories.length > 0) {
      const categoriesData = categories.reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {});
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: categoriesData,
      }));
    }
  }, [categories]);

  useEffect(() => {
    const selectedProducers = Object.keys(filters.producers).filter(
      (producer) => filters.producers[producer]
    );
    const selectedCategories = Object.keys(filters.categories).filter(
      (category) => filters.categories[category]
    );

    const updatedFilters = {
      ...filters,
      selectedManufacturers: selectedProducers,
      selectedCategories: selectedCategories,
    };

    if (JSON.stringify(updatedFilters) !== JSON.stringify(previousFiltersRef.current)) {
      debouncedOnFilterChange(updatedFilters);
      previousFiltersRef.current = updatedFilters;
    }
  }, [filters, debouncedOnFilterChange]);

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [name]: checked,
      },
    }));
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: 2, width: 300, backgroundColor: '#f5f5f5', borderRadius: 7 }}>
      <Typography variant="h6">Filtry</Typography>

      {categories.length > 0 && (
        <Box mt={2}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Kategoria</FormLabel>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      name={category}
                      checked={filters.categories[category]}
                      onChange={(e) => handleCheckboxChange(e, 'categories')}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      )}

      {manufacturers.length > 0 && (
        <Box mt={2}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Producent</FormLabel>
            <FormGroup>
              {manufacturers.map((manufacturer) => (
                <FormControlLabel
                  key={manufacturer}
                  control={
                    <Checkbox
                      name={manufacturer}
                      checked={filters.producers[manufacturer]}
                      onChange={(e) => handleCheckboxChange(e, 'producers')}
                    />
                  }
                  label={manufacturer}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      )}

      <Box mt={2}>
        <Typography variant="subtitle1">Cena</Typography>
        <Box display="flex" justifyContent="space-between">
          <Input
            placeholder="od"
            type="number"
            name="priceFrom"
            value={filters.priceFrom}
            onChange={handleInputChange}
          />
          <Input
            placeholder="do"
            type="number"
            name="priceTo"
            value={filters.priceTo}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Filter;
