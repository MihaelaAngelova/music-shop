document.addEventListener("DOMContentLoaded", function () {
    const jwt = getCookie("jwt");
    if(jwt === undefined) {
        const guestData = document.getElementById("guestData");
        guestData.style.display='block';

        const checkoutButton = document.getElementById("checkoutButton");
        checkoutButton.addEventListener("click", function (event) {

            const email = document.getElementById("guestEmail").value;
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const address = document.getElementById("address").value;
            const city = document.getElementById("city").value;
            const country = document.getElementById("country").value;


            const checkoutBody = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                country: country
            }
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:8080/cart/payment", checkoutBody)
                .then(response => {
                    window.location.href = "successfulOrderScreen.html";
                }).catch(error => console.error(error))
        })
    } else {
        const checkoutButton = document.getElementById("checkoutButton");
        checkoutButton.addEventListener("click", function (event) {
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:8080/cart/payment").then(response => {
                window.location.href = "successfulOrderScreen.html";
            }).catch(error => console.error(error))
        })
    }

})