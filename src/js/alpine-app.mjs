import { decodeJWT } from './decoder.mjs';
import { encodeJWT } from './encoder.mjs';
import { verifySignature } from './verifier.mjs';
import { highlightJSON } from './json-highlighter.mjs';

// Utility functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function highlightJWT(jwt) {
    if (!jwt) {
        return '';
    }

    const parts = jwt.split('.');
    if (parts.length === 3) {
        return `<span class="jwt-part-header">${escapeHtml(parts[0])}</span><span class="jwt-part-dot">.</span><span class="jwt-part-payload">${escapeHtml(parts[1])}</span><span class="jwt-part-dot">.</span><span class="jwt-part-signature">${escapeHtml(parts[2])}</span>`;
    } else {
        return escapeHtml(jwt);
    }
}

// Alpine.js Component
document.addEventListener('alpine:init', () => {
    Alpine.data('jwtDebugger', () => ({
        // Decoder state
        decoder: {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
            jwtHighlighted: '',
            header: '',
            payload: '',
            secret: 'a-string-secret-at-least-256-bits-long',
            secretBase64: false,
            signatureStatus: ''
        },

        // Encoder state
        encoder: {
            algorithm: 'HS256',
            payload: JSON.stringify({
                sub: "1234567890",
                name: "John Doe",
                admin: true,
                iat: 1516239022
            }, null, 2),
            payloadHighlighted: '',
            secret: 'a-string-secret-at-least-256-bits-long',
            secretBase64: false,
            generatedJWT: '',
            generatedJWTHighlighted: ''
        },

        // Initialize component
        init() {
            this.handleJWTDecode();
            this.handleJWTEncode();
        },

        // Decoder methods
        handleJWTDecode() {
            const jwt = this.decoder.jwt.trim();
            this.decoder.jwtHighlighted = highlightJWT(jwt);

            if (jwt) {
                try {
                    const decoded = decodeJWT(jwt);

                    // Display header with syntax highlighting
                    const formattedHeader = JSON.stringify(decoded.header, null, 2);
                    this.decoder.header = highlightJSON(formattedHeader);

                    // Display payload with syntax highlighting
                    const formattedPayload = JSON.stringify(decoded.payload, null, 2);
                    this.decoder.payload = highlightJSON(formattedPayload);

                    // Verify signature
                    this.verifySignature();
                } catch (error) {
                    this.decoder.header = 'Invalid JWT';
                    this.decoder.payload = escapeHtml(error.message);
                    this.decoder.signatureStatus = '';
                }
            } else {
                this.decoder.header = '';
                this.decoder.payload = 'Please enter a JWT.';
                this.decoder.signatureStatus = '';
            }
        },

        async verifySignature() {
            const jwt = this.decoder.jwt.trim();
            const secret = this.decoder.secret;
            const isBase64 = this.decoder.secretBase64;

            if (!jwt || !secret) {
                this.decoder.signatureStatus = '';
                return;
            }

            try {
                const isValid = await verifySignature(jwt, secret, isBase64);

                if (isValid) {
                    this.decoder.signatureStatus = `
                        <div class="alert alert-success mb-0" role="alert">
                            <strong>✓ Signature Verified</strong>
                        </div>
                    `;
                } else {
                    this.decoder.signatureStatus = `
                        <div class="alert alert-danger mb-0" role="alert">
                            <strong>✗ Invalid Signature</strong>
                        </div>
                    `;
                }
            } catch (error) {
                this.decoder.signatureStatus = `
                    <div class="alert alert-warning mb-0" role="alert">
                        <strong>⚠ ${escapeHtml(error.message)}</strong>
                    </div>
                `;
            }
        },

        copyJWT() {
            navigator.clipboard.writeText(this.decoder.jwt);
        },

        clearDecoder() {
            this.decoder.jwt = '';
            this.decoder.jwtHighlighted = '';
            this.decoder.header = '';
            this.decoder.payload = '';
            this.decoder.signatureStatus = '';
            this.decoder.secret = '';
            this.decoder.secretBase64 = false;
        },

        syncScroll(event) {
            const highlighted = event.target.nextElementSibling;
            if (highlighted) {
                highlighted.scrollTop = event.target.scrollTop;
                highlighted.scrollLeft = event.target.scrollLeft;
            }
        },

        // Encoder methods
        async handleJWTEncode() {
            const algorithmValue = this.encoder.algorithm;
            const payloadText = this.encoder.payload.trim();
            const secretValue = this.encoder.secret.trim();
            const isBase64Encoded = this.encoder.secretBase64;

            // Update payload highlighting
            if (payloadText) {
                try {
                    const parsed = JSON.parse(payloadText);
                    const formatted = JSON.stringify(parsed, null, 2);
                    this.encoder.payloadHighlighted = highlightJSON(formatted);
                } catch (error) {
                    // Just display without highlighting if invalid JSON
                    this.encoder.payloadHighlighted = escapeHtml(payloadText);
                }
            } else {
                this.encoder.payloadHighlighted = '';
            }

            if (!payloadText || !secretValue) {
                this.encoder.generatedJWT = '';
                this.encoder.generatedJWTHighlighted = '';
                return;
            }

            try {
                // Parse payload JSON
                const payload = JSON.parse(payloadText);

                // Create header
                const header = {
                    alg: algorithmValue,
                    typ: 'JWT'
                };

                // Generate JWT
                const jwt = await encodeJWT(header, payload, secretValue, isBase64Encoded);

                // Display generated JWT
                this.encoder.generatedJWT = jwt;
                this.encoder.generatedJWTHighlighted = highlightJWT(jwt);
            } catch (error) {
                if (error instanceof SyntaxError) {
                    this.encoder.generatedJWT = 'Error: Invalid JSON in payload';
                } else {
                    this.encoder.generatedJWT = `Error: ${error.message}`;
                }
                this.encoder.generatedJWTHighlighted = '';
            }
        },

        copyGeneratedJWT() {
            navigator.clipboard.writeText(this.encoder.generatedJWT);
        },

        clearEncoderPayload() {
            this.encoder.payload = '';
            this.encoder.payloadHighlighted = '';
            this.handleJWTEncode();
        },

        clearEncoderSecret() {
            this.encoder.secret = '';
            this.encoder.secretBase64 = false;
            this.handleJWTEncode();
        },

        syncScrollPayload(event) {
            const highlighted = event.target.nextElementSibling;
            if (highlighted) {
                highlighted.scrollTop = event.target.scrollTop;
                highlighted.scrollLeft = event.target.scrollLeft;
            }
        },

        syncScrollGenerated(event) {
            const highlighted = event.target.nextElementSibling;
            if (highlighted) {
                highlighted.scrollTop = event.target.scrollTop;
                highlighted.scrollLeft = event.target.scrollLeft;
            }
        }
    }));
});