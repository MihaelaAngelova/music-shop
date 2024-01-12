document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("registrationEmail").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("registrationPassword");

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password.value.length < 8 || !passwordRegex.test(password.value)) {
            console.log("Invalid password!");
        }

        const registrationBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password.value
        };

        axios.post('http://localhost:8080/auth/register', registrationBody)
            .then(response => {
                console.log('Registration successful');
                window.location.href = "login.html";

            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    });
});


