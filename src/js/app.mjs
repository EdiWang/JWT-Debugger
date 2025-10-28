import { elements } from './dom-elements.mjs';
import { handleJWTDecode } from './jwt-handler.mjs';
import { verifyJWTSignature } from './signature-handler.mjs';
import { setupEventListeners } from './event-handlers.mjs';

document.addEventListener('DOMContentLoaded', function () {
    // Get all DOM elements
    const domElements = {
        jwtInput: elements.jwtInput(),
        jwtHighlighted: elements.jwtHighlighted(),
        headerOutput: elements.headerOutput(),
        payloadOutput: elements.payloadOutput(),
        secretInput: elements.secretInput(),
        secretBase64Encoded: elements.secretBase64Encoded(),
        signatureStatus: elements.signatureStatus(),
        clearJWTBtn: elements.clearJWTBtn()
    };

    // Create bound handler functions
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

    // Setup all event listeners
    setupEventListeners(domElements, {
        handleJWTDecode: boundHandleJWTDecode,
        verifyJWTSignature: boundVerifyJWTSignature,
        clearAll
    });

    // Load default JWT
    const defaultJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    domElements.jwtInput.value = defaultJWT;

    // Load default secret
    const defaultSecret = 'a-string-secret-at-least-256-bits-long';
    domElements.secretInput.value = defaultSecret;

    // Initial decode
    boundHandleJWTDecode();
});