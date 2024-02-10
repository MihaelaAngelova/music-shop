import {displayProducts, displayFilteredProducts} from "./scripts.js";

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
    const spotifyAccessToken = localStorage.getItem('spotify_access_token');

    if (spotifyAccessToken !== null) {

        axios.get("http://localhost:8080/home")
            .then(response => {
                displayFilteredProducts(response.data, spotifyAccessToken);
            })
            .catch(error => {
                localStorage.removeItem('spotify_access_token');
                console.error("Error fetching products:", error);
            })
    } else if(code !== null && codeVerifier !== null) { // if there is spotify redirection
        let products = [];
        axios.get("http://localhost:8080/home")
            .then(response => {
                products = response.data;
                return getTokenPromise(code, codeVerifier);
            })
            .then(response => {
                const token = response.data.access_token;
                localStorage.setItem('spotify_access_token', token);
                displayFilteredProducts(products, token);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })
    }  else { // display the products without spotify functionality
        axios.get("http://localhost:8080/home")
            .then(function (response) {
                const products = response.data;
                displayProducts(products);
            })
            .catch(function (error) {
                console.error("Error fetching products:", error);
            });
    }
});

const clientId = 'your-client-id';
const redirectUri = 'http://localhost:63342/ecommerce/ecommerce-frontend/index.html';

function getTokenPromise(code, codeVerifier) {
    const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
    });

    return axios.post('https://accounts.spotify.com/api/token', body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}
