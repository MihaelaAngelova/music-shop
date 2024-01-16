document.addEventListener("DOMContentLoaded", function () {
    const jwt = getCookie("jwt");
    if(jwt === undefined) {
        const guestData = document.getElementById("guestData");
        guestData.style.display='block';

        guestData.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("guestEmail").value;
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const address = document.getElementById("address").value;
            const city = document.getElementById("city").value;
            const country = document.getElementById("country").value;
        })
    }
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}