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
    productListContainer.innerHTML = '';
    let row;
    products.forEach((product, index) => {
        if (index % 4 === 0) {
            row = document.createElement("div");
            row.className = "row";
            productListContainer.appendChild(row);
        }

        const productCard = createProductCard(product);
        row.appendChild(productCard);
    });

    if (products.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No products found.";
        productListContainer.appendChild(noResultsMessage);
    }

    const userRole = getCookie('userRole');
    if(userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {
        const addAProductButton = document.getElementById("addAProductButton");
        addAProductButton.style.display="block";
        addAProductButton.addEventListener("click", function() {
            addAProduct();
        })
    }
}

function addAProduct() {

    const userRole = getCookie('userRole');

    if (userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {

        const modal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        modal.show();

        const saveChangesButton = document.getElementById("saveProduct");
        saveChangesButton.addEventListener("click", saveChangesButtonClickHandler);
        function saveChangesButtonClickHandler() {
            console.log("Save Changes button clicked!");

            const productName = document.getElementById("productName").value;
            const productDescription = document.getElementById("productDescription").value;
            const productPrice = document.getElementById("productPrice").value;
            const productType = document.getElementById("productType").value;
            const productQuantity = document.getElementById("productQuantity").value;
            const productImageInput = document.getElementById("productImage");

            if (productImageInput.files.length > 0) {
                const productImage = productImageInput.files[0];

                const productDataObject = {
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    type: productType,
                    quantity: productQuantity
                };

                const productJson = JSON.stringify(productDataObject);
                const productBlob = new Blob([productJson], {
                    type: "application/json"
                });

                const formData = new FormData();
                formData.append("product-data-json", productBlob);
                formData.append("product-image", productImage);

                const jwt = getCookie("jwt");

                axios.post('http://localhost:8080/product', formData, {
                    headers: {
                        'Content-Type': 'multipart/mixed',
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                    .then(response => {
                        console.log("Product added successfully:", response.data);

                        modal.hide();
                    })
                    .catch(error => {
                        console.error("Error adding product:", error);
                    });
            } else {
                console.log("Please select an image file.");
            }
        }
    } else {
        console.log('You do not have permission to add a product.');
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// function setAuthHeaders() {
//     const jwt = getCookie("jwt");
//     if (jwt === undefined) {
//         axios.default.withCredentials = true;
//     } else {
//         axios.default.headers.common["Authorization"] = `Bearer ${jwt}`;
//     }
// }
export {displayProducts, getCookie}