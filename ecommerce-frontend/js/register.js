document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("registrationEmail").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("registrationPassword");

        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password.value.length < 8 || !passwordRegex.test(password)) {
            console.log("Invalid password!");
        }

        const registrationBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: password.value,
            address: address,
            city: city,
            country: country
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


