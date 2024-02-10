function createMainPageProductCard(product) {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";

    const cardContent = document.createElement("div");
    cardContent.className = "card product-cell";
    card.appendChild(cardContent);

    const productPictureLink = document.createElement("a");
    productPictureLink.href = `product.html?id=${product.id}`;
    productPictureLink.classList.add("product-picture-link");

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.name;

    productPictureLink.classList.add("product-title-link");

    const productImage = document.createElement("img");
    productImage.src = product.imagePath;
    productImage.alt = product.name;
    productImage.style.maxWidth = "100%";
    productImage.style.maxHeight = "100%";

    const priceParagraph = document.createElement("p");
    priceParagraph.className = "card-text";
    priceParagraph.textContent = `Price: ${product.price}lv.`;

    const quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", `quantity${product.id}`);
    quantityLabel.textContent = "Quantity:";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = `quantity${product.id}`;
    quantityInput.name = "quantity";

    quantityInput.value = "1";
    quantityInput.className = "inputCell";

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn btn-success";
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.onclick = function() {
        addToCart(product.id);
    };

    cardContent.appendChild(productPictureLink);
    productPictureLink.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(productImage);
    cardBody.appendChild(priceParagraph);
    cardContent.appendChild(quantityLabel);
    cardContent.appendChild(quantityInput);
    cardContent.appendChild(addToCartButton);

    productPictureLink.addEventListener('click', function(event) {
        event.preventDefault();
        navigateToProductDetails(product.id);
    });

    return card;
}

function navigateToProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function getFollowedArtists(token, after = null, allArtists = []) {
    const limit = 50; // Maximum limit per request
    const url = after ?
        `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&after=${after}` :
        `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`;

    return axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        const artists = response.data.artists;
        const nextAfter = artists.cursors && artists.cursors.after;
        const allArtistsSoFar = [...allArtists, ...artists.items.map(artist => artist.name)];

        return nextAfter ? getFollowedArtists(token, nextAfter, allArtistsSoFar) : allArtistsSoFar;
    });
}

function displayFilteredProducts(products, token) {
    getFollowedArtists(token)
        .then(artistNames => {
            const filteredProducts =
            products.filter(p => artistNames
                    .map(artistName => artistName.toLowerCase())
                    .some(artistName => p.description.toLowerCase().includes(artistName)
                        || p.name.toLowerCase().includes(artistName))
            );
            displayProducts(filteredProducts);
        })
        .catch(function (error) {
            console.error("Error fetching products:", error);
        });
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

        const productCard = createMainPageProductCard(product);
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
                        modal.hide();
                        window.location.reload();
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

export {displayProducts, getCookie, displayFilteredProducts}