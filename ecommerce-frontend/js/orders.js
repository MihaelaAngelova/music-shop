import {getCookie} from "./scripts.js";

fetchOrdersAndDisplay()
function fetchOrdersAndDisplay() {
    axios.defaults.withCredentials = true;
    const jwt = getCookie("jwt");
    axios.get('http://localhost:8080/orders', {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
        .then(response => {
            const orders = response.data;
            displayOrders(orders);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

function displayOrders(orders) {
    const orderListContainer = document.getElementById("orderList");
    orderListContainer.innerHTML = '';

    if (orders.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No orders found.";
        orderListContainer.appendChild(noResultsMessage);
    } else {
        let row;
        orders.forEach((order, index) => {
            if (index % 4 === 0) {
                row = document.createElement("div");
                row.className = "row";
                orderListContainer.appendChild(row);
            }

            const orderCard = createOrderCard(order);
            row.appendChild(orderCard);
        });
    }
}

function createOrderCard(order) {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";

    const cardContent = document.createElement("div");
    cardContent.className = "card order-cell";
    card.appendChild(cardContent);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const orderIdElement = document.createElement("h5");
    orderIdElement.className = "card-title";
    orderIdElement.textContent = "Order ID: " + order.id;

    const emailElement = document.createElement("p");
    emailElement.textContent = "Email: " + order.email;

    const addressElement = document.createElement("p");
    addressElement.textContent = "Address: " + order.address.address + ", " + order.address.city + ", " + order.address.country;

    const productsList = document.createElement("ul");
    productsList.className = "products-list";

    let totalPrice = 0;

    order.quantities.forEach(quantity => {
        const productItem = document.createElement("li");
        const productPrice = quantity.product.price * quantity.quantity;
        totalPrice += productPrice;
        productItem.textContent = quantity.product.name + " - Quantity: " + quantity.quantity + " - Price: " + productPrice.toFixed(2) + "lv.";
        productsList.appendChild(productItem);
    });

    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Total Price: " + totalPrice.toFixed(2);

    cardContent.appendChild(cardBody);
    cardBody.appendChild(orderIdElement);
    cardBody.appendChild(emailElement);
    cardBody.appendChild(addressElement);
    cardBody.appendChild(productsList);

    return card;
}



