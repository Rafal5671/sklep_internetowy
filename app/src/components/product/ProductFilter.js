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

const ProductFilter = ({ onFilterChange, categoryId }) => {
  const [filters, setFilters] = useState({
    producers: {},
    priceFrom: '',
    priceTo: '',
  });

  const [producers, setProducers] = useState([]);

  const previousFiltersRef = useRef(filters);

  const debouncedOnFilterChange = useCallback(debounce(onFilterChange, 300), [onFilterChange]);

  useEffect(() => {
    console.log('CategoryId changed:', categoryId);
    const fetchProducers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/manufacturers?categoryId=${categoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched producers for category', categoryId, data);
        const producersData = data.reduce((acc, producer) => {
          acc[producer] = false;
          return acc;
        }, {});
        setProducers(data);
        setFilters((prevFilters) => ({
          ...prevFilters,
          producers: producersData,
        }));
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    fetchProducers();
  }, [categoryId]);

  useEffect(() => {
    const selectedProducers = Object.keys(filters.producers).filter(
      (producer) => filters.producers[producer]
    );

    const updatedFilters = {
      ...filters,
      producers: selectedProducers,
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
      {categoryId && producers.length > 0 && (
        <Box mt={2}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Producent</FormLabel>
            <FormGroup>
              {producers.map((producer) => (
                <FormControlLabel
                  key={producer}
                  control={
                    <Checkbox
                      name={producer}
                      checked={filters.producers[producer]}
                      onChange={(e) => handleCheckboxChange(e, 'producers')}
                    />
                  }
                  label={producer}
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

export default ProductFilter;
