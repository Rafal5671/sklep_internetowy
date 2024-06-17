import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, FormControl, Select, MenuItem } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import Filter from "../components/product/Filter";
import axios from 'axios';

function SearchResults() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [query, setQuery] = useState("");
    const [manufacturers, setManufacturers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortOption, setSortOption] = useState('name-asc');

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get("query");
        setQuery(searchQuery);

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/products/search?query=${searchQuery}`);
                console.log('Fetched search results:', response.data);
                setProducts(response.data);
                setFilteredProducts(response.data);
                setIsLoading(false);
                
                const uniqueManufacturers = [...new Set(response.data.map(product => product.manufacturerName))];
                console.log(uniqueManufacturers);
                setManufacturers(uniqueManufacturers);

                const uniqueCategories = [...new Set(response.data.map(product => product.categoryName))];
                console.log(uniqueCategories);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };

        fetchSearchResults();
    }, [location]);

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    const applyFilters = (products, filters) => {
        return products.filter(product => {
            const meetsPriceFrom = !filters.priceFrom || product.price >= filters.priceFrom;
            const meetsPriceTo = !filters.priceTo || product.price <= filters.priceTo;
            const meetsManufacturers = !filters.selectedManufacturers || filters.selectedManufacturers.length === 0 || filters.selectedManufacturers.includes(product.manufacturerName);
            const meetsCategories = !filters.selectedCategories || filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.categoryName);
            return meetsPriceFrom && meetsPriceTo && meetsManufacturers && meetsCategories;
        });
    };

    const sortProducts = (products, sortOption) => {
        return [...products].sort((a, b) => {
            if (sortOption === 'name-asc') {
                return a.productName.localeCompare(b.productName);
            } else if (sortOption === 'name-desc') {
                return b.productName.localeCompare(a.productName);
            } else if (sortOption === 'price-asc') {
                return a.price - b.price;
            } else if (sortOption === 'price-desc') {
                return b.price - a.price;
            }
            return 0;
        });
    };

    const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        setFilters(newFilters);

        const filtered = applyFilters(products, newFilters);
        setFilteredProducts(sortProducts(filtered, sortOption));
    };

    useEffect(() => {
        setFilteredProducts(sortProducts(applyFilters(products, filters), sortOption));
    }, [sortOption, filters, products]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        width: '100%',
                    }}
                >
                    <Box sx={{ mr: 1, minWidth: '250px' }}>
                        <Filter onFilterChange={handleFilterChange} manufacturers={manufacturers} categories={categories} />
                    </Box>
                    <Container
                        maxWidth="lg"
                        sx={{
                            flex: 1,
                            py: 3,
                            borderRadius: 7,
                            backgroundColor: "#f5f5f5",
                            marginLeft: 4,
                            marginRight: 0,
                            paddingLeft: '8px',
                            paddingRight: '8px',
                        }}
                    >
                        {isLoading ? (
                            <Typography variant="h4" align="center">
                                Loading...
                            </Typography>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="h3" paragraph>
                                            Wyniki wyszukiwania dla "{query}"
                                        </Typography>
                                        <Typography sx={{ color: "gray", ml: 2 }} variant="h5" paragraph>
                                            ({filteredProducts.length} wyników)
                                        </Typography>
                                    </Box>
                                    <FormControl sx={{ minWidth: 200 }}>
                                        <Select
                                            labelId="sort-option-label"
                                            value={sortOption}
                                            onChange={handleSortOptionChange}
                                        >
                                            <MenuItem value="name-asc">Nazwa rosnąco</MenuItem>
                                            <MenuItem value="name-desc">Nazwa malejąco</MenuItem>
                                            <MenuItem value="price-asc">Cena rosnąco</MenuItem>
                                            <MenuItem value="price-desc">Cena malejąco</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ textAlign: "justify" }}>
                                    <ProductGrid products={filteredProducts} />
                                </Box>
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default SearchResults;
