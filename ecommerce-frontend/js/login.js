document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const passwordWarning = document.getElementById("passwordWarning");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword");

        const loginBody = {
            email: email,
            password: password.value
        };

        axios.post('http://localhost:8080/auth/login', loginBody)
            .then(response => {
                console.log("testt");
                if(response.data.jwt) {
                    document.cookie = `jwt=${response.data.jwt}; path=/`;
                    window.location.href = "index.html";
                } else {
                    console.log('Invalid email or password:');
                }
            })
            .catch(error => {
                console.log("Error during login:", error);
            });

    });
});