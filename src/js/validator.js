function validateJWT(token) {
    // Check if the token is a string
    if (typeof token !== 'string') {
        return { valid: false, error: 'Token must be a string' };
    }

    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Token must have 3 parts' };
    }

    // Validate the header and payload structure
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];

    try {
        // Decode the header and payload
        const decodedHeader = JSON.parse(atob(header));
        const decodedPayload = JSON.parse(atob(payload));

        // Check for required fields in the header
        if (!decodedHeader.alg || !decodedHeader.typ) {
            return { valid: false, error: 'Header must contain alg and typ' };
        }

        // Check for required fields in the payload
        if (!decodedPayload.sub || !decodedPayload.exp) {
            return { valid: false, error: 'Payload must contain sub and exp' };
        }

        // Additional validation can be added here (e.g., signature verification)

        return { valid: true, decoded: decodedPayload };
    } catch (e) {
        return { valid: false, error: 'Invalid token structure' };
    }
}

export { validateJWT };