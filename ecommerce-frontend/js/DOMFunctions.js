function addToCart(productId) {
    const quantity = document.getElementById(`quantity${productId}`).value;
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/cart/add', {
        productId: productId,
        quantity: Number(quantity)
    })
        .then(response => {
            alert(`Added ${quantity} item(s) to the cart!`);
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
        });
}
