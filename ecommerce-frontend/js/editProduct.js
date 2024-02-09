showEditButton();

function showEditButton() {
    const userRole = getCookie('userRole');
    if(userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {
        const editAProductButton = document.getElementById("editAProductButton");
        editAProductButton.style.display="block";
        editAProductButton.addEventListener("click", function() {
            editAProduct();
        })
    }
}


function editAProduct() {
    const userRole = getCookie('userRole');

    if (userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {

        const modal = new bootstrap.Modal(document.getElementById('editProductModal'), {
            keyboard: false
        });
        modal.show();

        axios.get('http://localhost:8080/product/' + productId)
            .then(function (response) {

                document.getElementById('editProductName').value = response.data.name;
                document.getElementById('editProductDescription').value = response.data.description;
                document.getElementById('editProductPrice').value = response.data.price;
                document.getElementById('editProductType').value = response.data.type;
                document.getElementById('editProductQuantity').value = response.data.quantity;
                document.getElementById('currentProductImage').src = response.data.imagePath;
            })
            .catch(function (error) {
                console.error('Error fetching product details:', error);
            });

        const saveChangesButton = document.getElementById("editSaveChanges");
        saveChangesButton.addEventListener("click", saveChangesButtonClickHandler);

        function saveChangesButtonClickHandler() {
            const productName = document.getElementById("editProductName").value;
            const productDescription = document.getElementById("editProductDescription").value;
            const productPrice = document.getElementById("editProductPrice").value;
            const productType = stringToInt(document.getElementById("editProductType").value);
            const productQuantity = document.getElementById("editProductQuantity").value;
            const newImageFile = document.getElementById("editProductImage");
            const currentImageFile = document.getElementById("currentProductImage");

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
            if (newImageFile) {
                formData.append("product-image", newImageFile);
            } else {
                formData.append("product-image", currentImageFile);
            }

            const jwt = getCookie("jwt");
            axios.put('http://localhost:8080/product/' + productId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwt}`
                }
            })
                .then(response => {
                    modal.hide();
                })
                .catch(error => {
                    console.error("Error editing product:", error);
                });
        }
    } else {
        console.log('You do not have permission to edit a product.');
    }
}


function stringToInt(string) {
    if(string === 'T_SHIRT') {
        return 0;
    } else if(string === 'MUG') {
        return 1;
    } else if(string === 'CD') {
        return 2;
    } else {
        return 3;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
