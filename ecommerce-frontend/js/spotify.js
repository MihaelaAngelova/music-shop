import { clientId, clientSecret } from './spotifyConfidential.js';

function authorizeSpotify() {
    const redirectUri = "http://localhost:63342/ecommerce/ecommerce-frontend/index.html";
    const scopes = 'user-read-private user-read-email user-follow-read';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;

}
document.addEventListener('DOMContentLoaded', function () {
    const spotifyLoginButton = document.getElementById('spotifyLoginButton');
    spotifyLoginButton.addEventListener('click', authorizeSpotify);
});

//
// // After the user is redirected back with an authorization code
// const authorizationCode = 'AUTHORIZATION_CODE'; // Retrieve this from the redirect URI
//
// axios.post('https://accounts.spotify.com/api/token', {
//     grant_type: 'authorization_code',
//     code: authorizationCode,
//     redirect_uri: redirectUri,
//     client_id: clientId,
//     client_secret: clientSecret
// }).then(response => {
//     const accessToken = response.data.access_token;
//     // Use the access token for subsequent requests to the Spotify API
// }).catch(error => console.error(error));
