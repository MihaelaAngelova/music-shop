showDeleteButton();
function showDeleteButton() {
    const userRole = getCookie('userRole');
    if(userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {
        const deleteAProductButton = document.getElementById("deleteAProductButton");
        deleteAProductButton.style.display="block";
        deleteAProductButton.addEventListener("click", function() {
            deleteAProduct();
        })
    }
}

function deleteAProduct() {
    const userRole = getCookie('userRole');

    if (userRole && userRole.toUpperCase() === 'ADMINISTRATOR') {

        const modal = new bootstrap.Modal(document.getElementById('deleteProductModal'), {
            keyboard: false
        });
        modal.show();

        const yesButton = document.getElementById("yesButton");


        const jwt = getCookie("jwt");
        yesButton.addEventListener("click", function() {
            axios.delete('http://localhost:8080/product/' + productId, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${jwt}`
                }
            })
                .then(response => {
                    window.location.href = "index.html";
                })
                .catch(function (error) {
                    console.error('Error deleting product:', error);
                });
        })

    } else {
        console.log('You do not have permission to edit a product.');
    }
}