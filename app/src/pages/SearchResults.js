import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import Filter from "../components/Filter";
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

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get("query");
        setQuery(searchQuery);

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/products/search?query=${searchQuery}`);
                console.log('Fetched search results:', response.data);
                setProducts(response.data);
                setFilteredProducts(response.data); // Set initial filtered products to all products
                setIsLoading(false);
                
                // Extract unique manufacturers from the products
                const uniqueManufacturers = [...new Set(response.data.map(product => product.manufacturerName))];
                console.log(uniqueManufacturers);
                setManufacturers(uniqueManufacturers);

                // Extract unique categories from the products
                const uniqueCategories = [...new Set(response.data.map(product => product.categoryName))];
                console.log(uniqueCategories);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };

        fetchSearchResults();
    }, [location]);

    const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        setFilters(newFilters);

        // Apply filters to products
        const filtered = products.filter(product => {
            const meetsPriceFrom = !newFilters.priceFrom || product.price >= newFilters.priceFrom;
            const meetsPriceTo = !newFilters.priceTo || product.price <= newFilters.priceTo;
            const meetsManufacturers = !newFilters.selectedManufacturers || newFilters.selectedManufacturers.length === 0 || newFilters.selectedManufacturers.includes(product.manufacturerName);
            const meetsCategories = !newFilters.selectedCategories || newFilters.selectedCategories.length === 0 || newFilters.selectedCategories.includes(product.categoryName);
            return meetsPriceFrom && meetsPriceTo && meetsManufacturers && meetsCategories;
        });
        setFilteredProducts(filtered);
    };

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
                            backgroundColor: "white",
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
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2 }}>
                                    <Typography variant="h3" paragraph>
                                        Wyniki wyszukiwania dla "{query}"
                                    </Typography>
                                    <Typography sx={{ color: "gray", ml: 2 }} variant="h5" paragraph>
                                        ({filteredProducts.length} wyników)
                                    </Typography>
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
