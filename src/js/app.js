import { decodeJWT } from './decoder.js';
import { verifySignature } from './verifier.js';

document.addEventListener('DOMContentLoaded', function () {
    const jwtInput = document.getElementById('jwt-input');
    const headerOutput = document.getElementById('header-output');
    const payloadOutput = document.getElementById('payload-output');
    const secretInput = document.getElementById('secret-input');
    const secretBase64Encoded = document.getElementById('secret-base64-encoded');
    const signatureStatus = document.getElementById('signature-status');
    const secretDisplay = document.getElementById('secret-display');

    function handleJWTDecode() {
        const jwt = jwtInput.value.trim();
        if (jwt) {
            try {
                const decoded = decodeJWT(jwt);
                
                // Display header
                headerOutput.textContent = JSON.stringify(decoded.header, null, 2);
                
                // Display payload
                payloadOutput.textContent = JSON.stringify(decoded.payload, null, 2);
                
                // Verify signature
                verifyJWTSignature();
            } catch (error) {
                headerOutput.textContent = 'Invalid JWT';
                payloadOutput.textContent = error.message;
                signatureStatus.innerHTML = '';
            }
        } else {
            headerOutput.textContent = '';
            payloadOutput.textContent = 'Please enter a JWT.';
            signatureStatus.innerHTML = '';
        }
    }

    function verifyJWTSignature() {
        const jwt = jwtInput.value.trim();
        const secret = secretInput.value;
        const isBase64 = secretBase64Encoded.checked;

        if (!jwt || !secret) {
            signatureStatus.innerHTML = '';
            return;
        }

        try {
            const isValid = verifySignature(jwt, secret, isBase64);
            
            if (isValid) {
                signatureStatus.innerHTML = `
                    <div class="alert alert-success mb-0" role="alert">
                        <strong>✓ Signature Verified</strong>
                    </div>
                `;
            } else {
                signatureStatus.innerHTML = `
                    <div class="alert alert-danger mb-0" role="alert">
                        <strong>✗ Invalid Signature</strong>
                    </div>
                `;
            }
        } catch (error) {
            signatureStatus.innerHTML = `
                <div class="alert alert-warning mb-0" role="alert">
                    <strong>⚠ ${error.message}</strong>
                </div>
            `;
        }
    }

    // Update secret display when typing
    secretInput.addEventListener('input', function() {
        secretDisplay.textContent = secretInput.value || 'your-256-bit-secret';
        verifyJWTSignature();
    });

    // Update verification when base64 checkbox changes
    secretBase64Encoded.addEventListener('change', verifyJWTSignature);

    // Decode on paste
    jwtInput.addEventListener('paste', function () {
        setTimeout(handleJWTDecode, 0);
    });

    // Decode on input change
    jwtInput.addEventListener('input', handleJWTDecode);

    // Load default JWT
    const defaultJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    jwtInput.value = defaultJWT;
    handleJWTDecode();
});