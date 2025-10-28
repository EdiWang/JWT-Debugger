export const elements = {
    jwtInput: () => document.getElementById('jwt-input'),
    jwtHighlighted: () => document.getElementById('jwt-highlighted'),
    headerOutput: () => document.getElementById('header-output'),
    payloadOutput: () => document.getElementById('payload-output'),
    secretInput: () => document.getElementById('secret-input'),
    secretBase64Encoded: () => document.getElementById('secret-base64-encoded'),
    signatureStatus: () => document.getElementById('signature-status'),
    copyJWTBtn: () => document.getElementById('copy-jwt-btn'),
    clearJWTBtn: () => document.getElementById('clear-jwt-btn')
};