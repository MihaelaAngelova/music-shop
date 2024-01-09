const productListContainer = document.getElementById('tshirtList');

axios.get('http://localhost:8080/category/0')
    .then(response => {
        displayTShirts(response.data);
    })
    .catch(error => {
        // Handle the error
        console.error('Error fetching T-Shirts:', error);
    });

function displayTShirts(tShirts) {
    tShirts.forEach(tShirt => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4', 'product-cell');

        productCard.innerHTML = `
            <h5>${tShirt.name}</h5>
            <p>${tShirt.description}</p>
            <p>${tShirt.price}</p>
            <button class="btn btn-custom">Add to Cart</button>
        `;
        productListContainer.appendChild(productCard);
    });
}
