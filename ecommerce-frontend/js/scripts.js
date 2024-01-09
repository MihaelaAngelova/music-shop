const productListContainer = document.getElementById('productList');

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
                <button class="btn btn-custom">Add to Cart</button>
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