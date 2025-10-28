import { decodeJWT } from './decoder.mjs';
import { highlightJWT } from './ui-helpers.mjs';

export function handleJWTDecode(jwtInput, jwtHighlighted, headerOutput, payloadOutput, signatureStatus, verifyCallback) {
    const jwt = jwtInput.value.trim();
    highlightJWT(jwt, jwtHighlighted);
    
    if (jwt) {
        try {
            const decoded = decodeJWT(jwt);

            // Display header
            headerOutput.textContent = JSON.stringify(decoded.header, null, 2);

            // Display payload
            payloadOutput.textContent = JSON.stringify(decoded.payload, null, 2);

            // Verify signature
            verifyCallback();
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