import { decodeJWT } from './decoder.js';

document.addEventListener('DOMContentLoaded', function () {
    const jwtInput = document.getElementById('jwt-input');
    const decodeButton = document.getElementById('decode-button');
    const outputArea = document.getElementById('output-area');

    decodeButton.addEventListener('click', function () {
        const jwt = jwtInput.value;
        if (jwt) {
            const decoded = decodeJWT(jwt);
            outputArea.textContent = JSON.stringify(decoded, null, 2);
        } else {
            outputArea.textContent = 'Please enter a JWT.';
        }
    });

    const defaultJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    jwtInput.value = defaultJWT;
});