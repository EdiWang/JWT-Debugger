function decodeJWT(jwt) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    return {
        header: header,
        payload: payload,
        signature: parts[2]
    };
}

function base64UrlDecode(str) {
    // Replace non-url compatible chars with base64 standard chars
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with trailing '='
    const padding = '='.repeat((4 - str.length % 4) % 4);
    str += padding;
    return atob(str);
}

export { decodeJWT };