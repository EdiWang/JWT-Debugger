import { encodeJWT } from './encoder.mjs';
import { highlightJWT } from './ui-helpers.mjs';

export async function handleJWTEncode(algorithm, payloadTextarea, secret, isBase64, outputTextarea, outputHighlighted) {
    const algorithmValue = algorithm.value;
    const payloadText = payloadTextarea.value.trim();
    const secretValue = secret.value.trim();
    const isBase64Encoded = isBase64.checked;

    if (!payloadText || !secretValue) {
        outputTextarea.value = '';
        outputHighlighted.innerHTML = '';
        return;
    }

    try {
        // Parse payload JSON
        const payload = JSON.parse(payloadText);

        // Create header
        const header = {
            alg: algorithmValue,
            typ: 'JWT'
        };

        // Generate JWT
        const jwt = await encodeJWT(header, payload, secretValue, isBase64Encoded);

        // Display generated JWT
        outputTextarea.value = jwt;
        highlightJWT(jwt, outputHighlighted);
    } catch (error) {
        if (error instanceof SyntaxError) {
            outputTextarea.value = 'Error: Invalid JSON in payload';
        } else {
            outputTextarea.value = `Error: ${error.message}`;
        }
        outputHighlighted.innerHTML = '';
    }
}