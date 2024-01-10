import {displayProducts} from "./scripts.js";

const urlParams = new URLSearchParams(location.search);
const catId = urlParams.get("id");

axios.get('http://localhost:8080/category/' + catId)
    .then(response => {
        displayProducts(response.data);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

function switchTitle() {
    let str;
    switch (catId) {
        case "0": str = "T-Shirts";
            break;
        case "1": str = "Mugs";
            break;
        case "2": str = "CDs";
            break;
        case "3": str = "Vinyls";
            break;
        default: str = "Invalid category..";
    }
    document.getElementById("pageTitle").innerHTML = str;
    const links = document.querySelectorAll('.nav-link-page');
    links.forEach(link => link.classList.remove('current'));

    // Add 'current' class to the current page link
    const currentPageLink = document.querySelector(`.nav-link-page[href="category.html?id=${catId}"]`);
    if (currentPageLink) {
        currentPageLink.classList.add('current');
    }

}

switchTitle();