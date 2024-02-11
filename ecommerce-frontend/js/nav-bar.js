document.addEventListener("DOMContentLoaded", function() {
    fetch("nav-bar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .then(() => {
            const urlParams = new URLSearchParams(location.search);
            const catId = urlParams.get("catId");
            setCurrentPageLink(catId);
            handleAuthenticationButtons();
            addLogoutListener();
            addSearchListeners();

        })
        .catch(error => console.error("Error fetching navbar:", error));
});

function addSearchListeners() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchField");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = `search.html?query=${searchInput.value}`;
    });

    searchInput.addEventListener("keyup", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            window.location.href = `search.html?query=${searchInput.value}`;
        }
    });
}

function setCurrentPageLink(catId) {
    const pageTitle = document.getElementById("pageTitle");
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => link.classList.remove('current'));
    if (catId !== null) {
        const currentPageLink = document.querySelector(`.nav-link[href="category.html?catId=${catId}"]`);
        if (currentPageLink) {
            currentPageLink.classList.add('current');
        }
    } else if(pageTitle !== null) {
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function handleAuthenticationButtons() {
    const userName = getCookie("nameCookie");
    if(userName === undefined) {
        return;
    }

    const registerLink = document.getElementById("registerLink");
    const userLink = document.getElementById('userLink');

    userLink.textContent = userName;
    registerLink.style.display = 'none';
    userLink.style.display = 'block';
}

function addLogoutListener () {
    const logoutButton = document.getElementById("da_si_hodim");

    logoutButton.addEventListener("click", function () {
        logoutUser();
    });
}

function logoutUser() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "nameCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "index.html";
}