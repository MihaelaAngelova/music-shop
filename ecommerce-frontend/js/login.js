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
                if(response.data.jwt) {
                    document.cookie = `jwt=${response.data.jwt}; path=/`;
                    return axios.get('http://localhost:8080/auth/me', {
                        headers: {
                            Authorization: `Bearer ${response.data.jwt}`
                        }
                    });
                } else {
                    console.log('Invalid email or password:');
                    passwordWarning.textContent = 'Invalid email or password';
                    passwordWarning.style.color = 'red';
                }
            })
            .then(response => {
                const firstName = response.data.firstName;
                const lastName = response.data.lastName;
                const userRole = response.data.userRole;
                const fullName = firstName + ' ' + lastName;
                document.cookie = `userRole=${userRole}; path=/`;
                document.cookie = `nameCookie=${fullName}; path=/`;
                window.location.href = "index.html";
            })
            .catch(error => {
                console.log("Error during login:", error);
            });
    });
});