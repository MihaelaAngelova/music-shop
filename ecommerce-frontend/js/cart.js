fetchCartItems();

function fetchCartItems() {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8080/cart')
        .then(response => {
            displayCartItems(response.data);
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}

function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:8080/product/${item.product.id}`)
            .then(response => {
                const productDetails = response.data;
                const cartItemElement = createCartItemElement(productDetails, item.quantity);
                cartItemsContainer.appendChild(cartItemElement);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    });
}

function createCartItemElement(product, quantity) {
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
        <div class="card product-cell">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <img src="${product.imagePath}" alt="${product.name}" style="max-width: 40%;"/>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Price: ${product.price}lv. - Quantity: ${quantity}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${product.id})">Remove</button>
            </div>
            <hr>
        </div>
    `;
    return cartItemElement;
}

function removeFromCart(productId) {
    axios.defaults.withCredentials = true;
    axios.delete(`http://localhost:8080/cart/${productId}`)
        .then(response => {
            fetchCartItems();
        })
        .catch(error => {
            console.error('Error removing item from cart:', error);
        });
}

function checkout() {
    alert('Initiating checkout...');
}