import { decodeJWT } from './decoder.js';

document.addEventListener('DOMContentLoaded', function () {
    const jwtInput = document.getElementById('jwt-input');
    const outputArea = document.getElementById('output-area');

    function handleJWTDecode() {
        const jwt = jwtInput.value.trim();
        if (jwt) {
            const decoded = decodeJWT(jwt);
            outputArea.textContent = JSON.stringify(decoded, null, 2);
        } else {
            outputArea.textContent = 'Please enter a JWT.';
        }
    }

    // Decode on paste
    jwtInput.addEventListener('paste', function () {
        // Use setTimeout to wait for the paste content to be available
        setTimeout(handleJWTDecode, 0);
    });

    // Decode on input change (for manual typing)
    jwtInput.addEventListener('input', handleJWTDecode);

    const defaultJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    jwtInput.value = defaultJWT;
    handleJWTDecode(); // Decode the default JWT on load
});