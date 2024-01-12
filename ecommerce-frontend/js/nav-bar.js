document.addEventListener("DOMContentLoaded", function() {
    fetch("nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .then(() => {
            const urlParams = new URLSearchParams(location.search);
            const catId = urlParams.get("id");
            setCurrentPageLink(catId);
        })
        .catch(error => console.error("Error fetching navbar:", error));
});

function setCurrentPageLink(catId) {
    const pageTitle = document.getElementById("pageTitle");
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => link.classList.remove('current'));
    if (catId !== null) {
        const currentPageLink = document.querySelector(`.nav-link[href="category.html?id=${catId}"]`);
        if (currentPageLink) {
            currentPageLink.classList.add('current');
        }
    } else {
        if (pageTitle.innerHTML === "Featured Products") {
            const homePageLink = document.querySelector('.nav-link[href="index.html"]');
            if (homePageLink) {
                homePageLink.classList.add('current');
            }
        } else if(pageTitle.innerHTML === "Shopping Cart") {
            const categoryPageLink = document.querySelector('.nav-link[href="cart.html"]');
            if(categoryPageLink) {
                categoryPageLink.classList.add('current');
            }
        } else if (pageTitle.innerHTML === "User Registration") {
            const registerPageLink = document.querySelector('.nav-link[href="register.html"]');
            if (registerPageLink) {
                registerPageLink.classList.add('current');
            }
        }
    }
}
