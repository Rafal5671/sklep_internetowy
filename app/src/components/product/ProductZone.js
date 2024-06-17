import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import axios from "axios";

function ProductZone() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/products");
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                setProducts(shuffled.slice(0, 12));
                console.log("Products",shuffled);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <ProductGrid products={products} />
        </div>
    );
}

export default ProductZone;

