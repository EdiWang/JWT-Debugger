import { syncScroll } from './ui-helpers.mjs';

export function setupEventListeners(domElements, handlers) {
    // Decoder event listeners
    domElements.jwtInput.addEventListener('input', handlers.handleJWTDecode);
    domElements.jwtInput.addEventListener('scroll', () => syncScroll(domElements.jwtInput, domElements.jwtHighlighted));
    domElements.secretInput.addEventListener('input', handlers.verifyJWTSignature);
    domElements.secretBase64Encoded.addEventListener('change', handlers.verifyJWTSignature);

    domElements.copyJWTBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(domElements.jwtInput.value);
    });

    domElements.clearJWTBtn.addEventListener('click', handlers.clearAll);

    // Encoder event listeners
    domElements.encoderAlgorithm.addEventListener('change', handlers.handleJWTEncode);
    domElements.encoderPayload.addEventListener('input', handlers.handleJWTEncode);
    domElements.encoderSecret.addEventListener('input', handlers.handleJWTEncode);
    domElements.encoderSecretBase64.addEventListener('change', handlers.handleJWTEncode);

    domElements.generatedJwtOutput.addEventListener('scroll', () =>
        syncScroll(domElements.generatedJwtOutput, domElements.generatedJwtHighlighted)
    );

    domElements.copyGeneratedJwtBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(domElements.generatedJwtOutput.value);
    });

    domElements.clearEncoderHeaderBtn.addEventListener('click', () => {
        domElements.encoderAlgorithm.value = 'HS256';
        handlers.handleJWTEncode();
    });

    domElements.clearEncoderPayloadBtn.addEventListener('click', () => {
        domElements.encoderPayload.value = '';
        handlers.handleJWTEncode();
    });

    domElements.clearEncoderSecretBtn.addEventListener('click', () => {
        domElements.encoderSecret.value = '';
        domElements.encoderSecretBase64.checked = false;
        handlers.handleJWTEncode();
    });
}