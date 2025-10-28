import { decodeJWT } from './decoder.js';

document.addEventListener('DOMContentLoaded', function() {
    const jwtInput = document.getElementById('jwt-input');
    const decodeButton = document.getElementById('decode-button');
    const outputArea = document.getElementById('output-area');

    decodeButton.addEventListener('click', function() {
        const jwt = jwtInput.value;
        if (jwt) {
            const decoded = decodeJWT(jwt);
            outputArea.textContent = JSON.stringify(decoded, null, 2);
        } else {
            outputArea.textContent = 'Please enter a JWT.';
        }
    });
});