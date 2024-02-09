function fetchProductDetails(productId) {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:8080/product/${productId}`)
        .then(response => {
            displayProductDetails(response.data);
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
        });
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('productDetails');

    const productHTML = `
        <div class="card product-cell">
            <div class="product-details-container">
                <div class="product-image-container">
                    <h1 class="card-title">${product.name}</h1>
                    <img src="${product.imagePath}" alt="${product.name}" class="product-image" style="width: 60%; height: auto;"/>
                </div>
                <div class="product-details-content">
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: ${product.price}lv.</p>
                    <div class="mt-2">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity${product.id}" name="quantity" min="1" max="10" value="1" class="inputCell">
                        <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    productDetailsContainer.innerHTML = productHTML;
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetchProductDetails(productId);

