import { decodeJWT } from './decoder.mjs';
import { highlightJWT } from './ui-helpers.mjs';
import { highlightJSON } from './json-highlighter.mjs';

export function handleJWTDecode(jwtInput, jwtHighlighted, headerOutput, payloadOutput, signatureStatus, verifyCallback) {
    const jwt = jwtInput.value.trim();
    highlightJWT(jwt, jwtHighlighted);
    
    if (jwt) {
        try {
            const decoded = decodeJWT(jwt);

            // Display header with syntax highlighting
            const formattedHeader = JSON.stringify(decoded.header, null, 2);
            headerOutput.innerHTML = highlightJSON(formattedHeader);

            // Display payload with syntax highlighting
            const formattedPayload = JSON.stringify(decoded.payload, null, 2);
            payloadOutput.innerHTML = highlightJSON(formattedPayload);

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