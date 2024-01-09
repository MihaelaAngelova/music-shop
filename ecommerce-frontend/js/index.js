import {displayProducts} from "./scripts.js";

document.addEventListener("DOMContentLoaded", function () {
    // Fetch products from the backend
    axios.get("http://localhost:8080/home")
        .then(function (response) {
            // Handle the response data (list of products)
            const products = response.data;
            displayProducts(products);
        })
        .catch(function (error) {
            console.error("Error fetching products:", error);
        });
});
