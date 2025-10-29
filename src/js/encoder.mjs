async function encodeJWT(header, payload, secret, isBase64Encoded = false) {
    // Encode header
    const headerStr = JSON.stringify(header);
    const headerB64 = base64UrlEncode(headerStr);

    // Encode payload
    const payloadStr = JSON.stringify(payload);
    const payloadB64 = base64UrlEncode(payloadStr);

    // Prepare the secret key
    let keyData;
    if (isBase64Encoded) {
        const binaryString = atob(secret);
        keyData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            keyData[i] = binaryString.charCodeAt(i);
        }
    } else {
        const encoder = new TextEncoder();
        keyData = encoder.encode(secret);
    }

    // Determine the algorithm
    const algMap = {
        'HS256': 'SHA-256',
        'HS384': 'SHA-384',
        'HS512': 'SHA-512'
    };
    
    const algorithm = algMap[header.alg];
    if (!algorithm) {
        throw new Error(`Unsupported algorithm: ${header.alg}`);
    }

    // Import the key
    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algorithm },
        false,
        ['sign']
    );

    // Sign the data
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signature = await crypto.subtle.sign('HMAC', key, data);

    // Convert signature to base64url
    const signatureArray = new Uint8Array(signature);
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    return `${headerB64}.${payloadB64}.${signatureBase64}`;
}

function base64UrlEncode(str) {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export { encodeJWT };