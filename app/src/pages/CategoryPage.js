import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Pagination, FormControl, Select, MenuItem } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilter from "../components/product/ProductFilter";
import axios from 'axios';

function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        producers: [],
        priceFrom: '',
        priceTo: '',
    });
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState('name-asc');
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/categories/${categoryId}/products`);
                console.log('Fetched category data:', response.data);
                if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                    setCategoryName(response.data.categoryName);
                } else {
                    console.error('Expected an array of products, but got:', response.data.products);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch category data:', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    useEffect(() => {
        setPage(1); 
    }, [categoryId]);

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    const applyFilters = (products, filters) => {
        return products.filter(product => {
            const meetsPriceFrom = filters.priceFrom ? product.price >= filters.priceFrom : true;
            const meetsPriceTo = filters.priceTo ? product.price <= filters.priceTo : true;
            const meetsProducers = filters.producers.length > 0 ? filters.producers.some(producer => product.productName.toLowerCase().includes(producer.toLowerCase())) : true;

            return meetsPriceFrom && meetsPriceTo && meetsProducers;
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
    };

    const handleAddToBasket = (productId) => {
        console.log(`Product ${productId} added to basket`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredProducts = applyFilters(products, filters);
    const sortedProducts = sortProducts(filteredProducts, sortOption);
    const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const productText = filteredProducts.length === 1 ? 'wynik' : 'wyniki';

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
                        <ProductFilter onFilterChange={handleFilterChange} categoryId={categoryId} />
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
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="h3" paragraph>
                                            {categoryName}
                                        </Typography>
                                        <Typography sx={{ color: "gray", ml: 2 }} variant="h5" paragraph>
                                            ({filteredProducts.length} {productText})
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
                                    <ProductGrid products={paginatedProducts} onAddToBasket={handleAddToBasket} />
                                </Box>
                                {pageCount > 1 && (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default CategoryPage;
