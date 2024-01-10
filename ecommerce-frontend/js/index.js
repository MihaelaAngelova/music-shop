import {displayProducts} from "./scripts.js";

document.addEventListener("DOMContentLoaded", function () {
    axios.get("http://localhost:8080/home")
        .then(function (response) {
            const products = response.data;
            displayProducts(products);
        })
        .catch(function (error) {
            console.error("Error fetching products:", error);
        });
});
