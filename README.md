# JWT Debugger

## Overview

The JWT Debugger is a web application designed to decode, validate, and generate JSON Web Tokens (JWTs). It provides a user-friendly interface for developers to inspect and create JWTs, making it easier to understand their structure and contents.

Demo: https://jwt.edi.wang

## Features

### JWT Decoder
- **JWT Decoding**: Input a JWT and see its decoded header and payload with syntax highlighting
- **Signature Verification**: Verify JWT signatures using HMAC algorithms (HS256, HS384, HS512)
- **Base64-Encoded Secret Support**: Option to use base64-encoded secrets for verification
- **Copy & Clear Functions**: Easily copy JWT tokens or clear the input
- **Real-time Validation**: Instant feedback on JWT validity and signature verification status

### JWT Encoder
- **JWT Generation**: Create signed JWTs with custom headers and payloads
- **Algorithm Selection**: Support for HS256, HS384, and HS512 HMAC algorithms
- **JSON Payload Editor**: Edit payload data with syntax highlighting and validation
- **Secret Configuration**: Use plain text or base64-encoded secrets for signing
- **Copy Generated JWT**: One-click copy of the generated token

### User Experience
- **Syntax Highlighting**: Color-coded display for JWT parts (header, payload, signature) and JSON syntax
- **Dark Mode Support**: Automatic theme detection with manual toggle (auto/light/dark)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Scroll Synchronization**: Synchronized scrolling between textarea and highlighted overlay

## Technology Stack

- **Frontend Framework**: [Alpine.js](https://alpinejs.dev/) for reactive components
- **UI Framework**: [Bootstrap 5](https://getbootstrap.com/) for responsive design
- **Cryptography**: Web Crypto API for HMAC signing and verification
- **Module System**: ES6 modules for clean code organization
