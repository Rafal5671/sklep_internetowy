import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter"; // Import the ProductFilter component
import axios from 'axios';

function SearchResults() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [query, setQuery] = useState("");

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get("query");
        setQuery(searchQuery);

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/products/search?query=${searchQuery}`);
                console.log('Fetched search results:', response.data);
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };

        fetchSearchResults();
    }, [location]);

    const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        setFilters(newFilters);
        // Apply filtering logic if needed
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <AppNavbar />
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
                        <ProductFilter onFilterChange={handleFilterChange} />
                    </Box>
                    <Container
                        maxWidth="lg"
                        sx={{
                            flex: 1,
                            py: 3,
                            borderRadius: 7,
                            backgroundColor: "white",
                            marginLeft: 4, // Remove left margin
                            marginRight: 0, // Remove right margin
                            paddingLeft: '8px', // Add slight padding to the left
                            paddingRight: '8px', // Add slight padding to the right
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
                                        Search Results for "{query}"
                                    </Typography>
                                    <Typography sx={{ color: "gray", ml: 2 }} variant="h5" paragraph>
                                        ({products.length} results)
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "justify" }}>
                                    <ProductGrid products={products} />
                                </Box>
                            </>
                        )}
                    </Container>
                </Box>
                <AppFooter />
            </Box>
        </>
    );
}

export default SearchResults;
