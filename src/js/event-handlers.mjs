import { syncScroll } from './ui-helpers.mjs';

export function setupEventListeners(elements, handlers) {
    const { jwtInput, jwtHighlighted, secretInput, secretBase64Encoded, clearJWTBtn } = elements;
    const { handleJWTDecode, verifyJWTSignature, clearAll } = handlers;

    // Sync scroll between textarea and highlight div
    jwtInput.addEventListener('scroll', () => syncScroll(jwtInput, jwtHighlighted));

    // Automatically revalidate signature when secret input changes
    secretInput.addEventListener('input', verifyJWTSignature);

    // Update verification when base64 checkbox changes
    secretBase64Encoded.addEventListener('change', verifyJWTSignature);

    // Decode on paste
    jwtInput.addEventListener('paste', function () {
        setTimeout(handleJWTDecode, 0);
    });

    // Decode on input change
    jwtInput.addEventListener('input', handleJWTDecode);

    // Clear button functionality
    clearJWTBtn.addEventListener('click', clearAll);
}