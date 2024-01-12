document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const passwordWarning = document.getElementById("passwordWarning");
    const loginForm = document.getElementById("loginForm");
    const showLoginFormLink = document.getElementById("showLoginForm");

    loginForm.style.display = "none";
    passwordWarning.style.display = "none";

    showLoginFormLink.addEventListener("click", function () {
        registrationForm.style.display = registrationForm.style.display === "none" ? "block" : "none";
        loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";

        const email = document.getElementById("email").value;
        const password = document.getElementById("password");

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password.value.length < 8 || !passwordRegex.test(password.value)) {
            event.preventDefault();
            passwordWarning.style.display = "block";
        } else {
            passwordWarning.style.display = "none";
        }

        const loginBody = {
            email: email,
            password: password.value
        };

        axios.post("http://localhost:8080/auth/login", loginBody)
            .then(response => {
                console.log('Login successful');
                document.getElementById("navbarUsername").innerText = username;
                window.location.href = "index.html";
            }) .catch(error => {
            console.error('Error during login:', error);
        });

    });

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password");

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password.value.length < 8 || !passwordRegex.test(password.value)) {
            event.preventDefault();
            passwordWarning.style.display = "block";
        } else {
            passwordWarning.style.display = "none";
        }

        const registrationBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password.value,
        };

        axios.post('http://localhost:8080/auth/register', registrationBody)
            .then(response => {
                console.log('Registration successful');
                document.getElementById("navbarUsername").innerText = username;
                window.location.href = "index.html";

            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    });

    loginForm.addEventListener("submit", function (event) {
        // ... (your login form handling logic)
    });

});


