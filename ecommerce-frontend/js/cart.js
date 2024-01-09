fetchCartItems();

function fetchCartItems() {
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
    console.log(cartItems);
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
                <p>${item.name} - Quantity: ${item.quantity}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${item.productId})">Remove</button>
                <hr>
            `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

function removeFromCart(productId) {
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