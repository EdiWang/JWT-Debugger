import { verifySignature } from './verifier.mjs';

export async function verifyJWTSignature(jwtInput, secretInput, secretBase64Encoded, signatureStatus) {
    const jwt = jwtInput.value.trim();
    const secret = secretInput.value;
    const isBase64 = secretBase64Encoded.checked;

    if (!jwt || !secret) {
        signatureStatus.innerHTML = '';
        return;
    }

    try {
        const isValid = await verifySignature(jwt, secret, isBase64);

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