import { elements } from './dom-elements.mjs';
import { handleJWTDecode } from './jwt-handler.mjs';
import { handleJWTEncode } from './encoder-handler.mjs';
import { verifyJWTSignature } from './signature-handler.mjs';
import { setupEventListeners } from './event-handlers.mjs';
import { initJSONEditor } from './json-editor.mjs';

document.addEventListener('DOMContentLoaded', function () {
    // Get all DOM elements
    const domElements = {
        // Decoder elements
        jwtInput: elements.jwtInput(),
        jwtHighlighted: elements.jwtHighlighted(),
        headerOutput: elements.headerOutput(),
        payloadOutput: elements.payloadOutput(),
        secretInput: elements.secretInput(),
        secretBase64Encoded: elements.secretBase64Encoded(),
        signatureStatus: elements.signatureStatus(),
        copyJWTBtn: elements.copyJWTBtn(),
        clearJWTBtn: elements.clearJWTBtn(),

        // Encoder elements
        encoderAlgorithm: elements.encoderAlgorithm(),
        encoderPayload: elements.encoderPayload(),
        encoderPayloadHighlighted: elements.encoderPayloadHighlighted(),
        encoderSecret: elements.encoderSecret(),
        encoderSecretBase64: elements.encoderSecretBase64(),
        generatedJwtOutput: elements.generatedJwtOutput(),
        generatedJwtHighlighted: elements.generatedJwtHighlighted(),
        copyGeneratedJwtBtn: elements.copyGeneratedJwtBtn(),
        clearEncoderPayloadBtn: elements.clearEncoderPayloadBtn(),
        clearEncoderSecretBtn: elements.clearEncoderSecretBtn()
    };

    // Create bound handler functions for decoder
    const boundHandleJWTDecode = () => handleJWTDecode(
        domElements.jwtInput,
        domElements.jwtHighlighted,
        domElements.headerOutput,
        domElements.payloadOutput,
        domElements.signatureStatus,
        boundVerifyJWTSignature
    );

    const boundVerifyJWTSignature = () => verifyJWTSignature(
        domElements.jwtInput,
        domElements.secretInput,
        domElements.secretBase64Encoded,
        domElements.signatureStatus
    );

    const clearAll = () => {
        domElements.jwtInput.value = '';
        domElements.jwtHighlighted.innerHTML = '';
        domElements.headerOutput.textContent = '';
        domElements.payloadOutput.textContent = '';
        domElements.signatureStatus.innerHTML = '';
        domElements.secretInput.value = '';
        domElements.secretBase64Encoded.checked = false;
    };

    // Create bound handler function for encoder
    const boundHandleJWTEncode = () => handleJWTEncode(
        domElements.encoderAlgorithm,
        domElements.encoderPayload,
        domElements.encoderSecret,
        domElements.encoderSecretBase64,
        domElements.generatedJwtOutput,
        domElements.generatedJwtHighlighted
    );

    // Load default values for encoder BEFORE initializing the editor
    const defaultSecret = 'a-string-secret-at-least-256-bits-long';
    const defaultPayload = JSON.stringify({
        sub: "1234567890",
        name: "John Doe",
        admin: true,
        iat: 1516239022
    }, null, 2);
    domElements.encoderPayload.value = defaultPayload;
    domElements.encoderSecret.value = defaultSecret;

    // Initialize JSON editor for encoder payload (will highlight the default value)
    initJSONEditor(
        domElements.encoderPayload,
        domElements.encoderPayloadHighlighted,
        boundHandleJWTEncode
    );

    // Setup all event listeners
    setupEventListeners(domElements, {
        handleJWTDecode: boundHandleJWTDecode,
        verifyJWTSignature: boundVerifyJWTSignature,
        clearAll,
        handleJWTEncode: boundHandleJWTEncode
    });

    // Load default JWT for decoder
    const defaultJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    domElements.jwtInput.value = defaultJWT;

    // Load default secret for decoder
    domElements.secretInput.value = defaultSecret;

    // Initial decode
    boundHandleJWTDecode();

    // Initial encode
    boundHandleJWTEncode();
});