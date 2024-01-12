document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const passwordWarning = document.getElementById("passwordWarning");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");

        const loginBody = {
            email: email,
            password: password.value
        };

        axios.post('http://localhost:8080/auth/login', loginBody)
            .then(response => {
                console.log('Login successful');
                window.location.href = "index.html";
            })
            .catch(error => {
                console.log('Error during login:', error);
            });

    });
}