const productListContainer = document.getElementById('productList');

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
        <div class="card product-cell">
<!--            <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}">-->
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
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
    products.forEach(p => {
        const productCard = createProductCard(p);
        productListContainer.appendChild(productCard);
    });
}



export {displayProducts}