// Fetch and display cart items when the page loads
fetchCartItems();

// Function to fetch and display cart items
function fetchCartItems() {
    axios.get('http://localhost:8080/cart')
        .then(response => {
            displayCartItems(response.data);
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}

// Function to display cart items
function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
                <p>${item.productName} - Quantity: ${item.quantity}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${item.productId})">Remove</button>
                <hr>
            `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Function to remove item from the cart
function removeFromCart(productId) {
    axios.delete(`http://localhost:8080/cart/${productId}`)
        .then(response => {
            // Refresh the cart items after removal
            fetchCartItems();
        })
        .catch(error => {
            console.error('Error removing item from cart:', error);
        });
}

// Function to initiate checkout
function checkout() {
    // Implement the logic to initiate checkout (optional)
    alert('Initiating checkout...');
}