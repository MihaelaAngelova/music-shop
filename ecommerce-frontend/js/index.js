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

function displayProducts(products) {
    // Render products on the page (you can use JavaScript to manipulate the DOM)
    const productListElement = document.getElementById("productList");

    products.forEach(function (product) {
        // Create HTML elements for each product and append them to the productListElement
        const productCard = createProductCard(product);
        productListElement.appendChild(productCard);
    });
}

function createProductCard(product) {
    // Create and return HTML elements for a product card
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
        <div class="card product-cell">
<!--            <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}">-->
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: ${product.price}lv.</p>
                <a href="#" class="btn btn-custom">View Details</a>
            </div>
        </div>
    `;

    return card;
}
