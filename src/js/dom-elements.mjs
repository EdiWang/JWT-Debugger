export const elements = {
    // Decoder elements
    jwtInput: () => document.getElementById('jwt-input'),
    jwtHighlighted: () => document.getElementById('jwt-highlighted'),
    headerOutput: () => document.getElementById('header-output'),
    payloadOutput: () => document.getElementById('payload-output'),
    secretInput: () => document.getElementById('secret-input'),
    secretBase64Encoded: () => document.getElementById('secret-base64-encoded'),
    signatureStatus: () => document.getElementById('signature-status'),
    copyJWTBtn: () => document.getElementById('copy-jwt-btn'),
    clearJWTBtn: () => document.getElementById('clear-jwt-btn'),

    // Encoder elements
    encoderAlgorithm: () => document.getElementById('encoder-algorithm'),
    encoderPayload: () => document.getElementById('encoder-payload'),
    encoderPayloadHighlighted: () => document.getElementById('encoder-payload-highlighted'),
    encoderSecret: () => document.getElementById('encoder-secret'),
    encoderSecretBase64: () => document.getElementById('encoder-secret-base64'),
    generatedJwtOutput: () => document.getElementById('generated-jwt-output'),
    generatedJwtHighlighted: () => document.getElementById('generated-jwt-highlighted'),
    copyGeneratedJwtBtn: () => document.getElementById('copy-generated-jwt-btn'),
    clearEncoderPayloadBtn: () => document.getElementById('clear-encoder-payload-btn'),
    clearEncoderSecretBtn: () => document.getElementById('clear-encoder-secret-btn')
};