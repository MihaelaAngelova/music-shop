const productListContainer = document.getElementById('productList');

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";

    card.innerHTML = `
        <div class="card product-cell">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <img src="${product.imagePath}" alt="${product.name}" style="max-width: 100%; max-height: 100%;"/>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: ${product.price}lv.</p>
            </div>
            <div class="mt-2">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity${product.id}" name="quantity" min="1" max="10" value="1" class="inputCell">
                <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    return card;
}

function displayProducts(products) {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = ''; // Clear existing content

    let row;
    products.forEach((product, index) => {
        if (index % 4 === 0) {
            // Start a new row for every 4th product
            row = document.createElement("div");
            row.className = "row";
            productListContainer.appendChild(row);
        }

        const productCard = createProductCard(product);
        row.appendChild(productCard);
    });
}

export {displayProducts}