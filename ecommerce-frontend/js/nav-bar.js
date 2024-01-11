document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert the navigation bar
    fetch("nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error("Error fetching navbar:", error));
});
