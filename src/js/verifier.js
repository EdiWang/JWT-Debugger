async function verifySignature(jwt, secret, isBase64Encoded = false) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const [headerB64, payloadB64, signatureB64] = parts;
    const header = JSON.parse(base64UrlDecode(headerB64));
    
    // Only support HMAC algorithms for now
    if (!header.alg || !header.alg.startsWith('HS')) {
        throw new Error(`Algorithm ${header.alg} not supported for verification`);
    }

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

    return signatureBase64 === signatureB64;
}

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - str.length % 4) % 4);
    str += padding;
    return atob(str);
}

export { verifySignature };