import { syncScroll } from './ui-helpers.mjs';

export function setupEventListeners(elements, handlers) {
    const { jwtInput, jwtHighlighted, secretInput, secretBase64Encoded, copyJWTBtn, clearJWTBtn } = elements;
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

    // Copy button functionality
    copyJWTBtn.addEventListener('click', async function () {
        const jwtValue = jwtInput.value.trim();
        if (jwtValue) {
            try {
                await navigator.clipboard.writeText(jwtValue);
                // Visual feedback
                const originalText = copyJWTBtn.textContent;
                copyJWTBtn.textContent = 'Copied!';
                copyJWTBtn.classList.add('btn-success');
                copyJWTBtn.classList.remove('btn-outline-secondary');
                
                setTimeout(() => {
                    copyJWTBtn.textContent = originalText;
                    copyJWTBtn.classList.remove('btn-success');
                    copyJWTBtn.classList.add('btn-outline-secondary');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy JWT:', err);
                // Fallback for older browsers
                jwtInput.select();
                document.execCommand('copy');
            }
        }
    });

    // Clear button functionality
    clearJWTBtn.addEventListener('click', clearAll);
}