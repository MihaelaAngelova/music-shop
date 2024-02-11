import {displayProducts} from "./scripts.js";

document.addEventListener('DOMContentLoaded', function() {
    const searchTerm =  new URLSearchParams(location.search).get("query");

    if (searchTerm !== "" && searchTerm !== null) {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/search/${searchTerm}`)
            .then(response => {
                displayProducts(response.data);
            })
            .catch(error => {
                console.error("Error searching products:", error);
            });
    } else {
        document.getElementById("searchResults").innerHTML = "";
    }
});
