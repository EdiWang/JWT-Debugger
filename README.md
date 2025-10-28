# JWT Debugger

## Overview
The JWT Debugger is a web application designed to decode and validate JSON Web Tokens (JWTs). It provides a user-friendly interface for developers to inspect JWTs, making it easier to understand their structure and contents.

## Features
- **JWT Decoding**: Input a JWT and see its decoded header and payload.
- **JWT Validation**: Check the validity of a JWT, including its structure and signature.
- **User Interface**: Built with Bootstrap for a responsive and modern design.

## Project Structure
```
jwt-debugger
├── src
│   ├── index.html        # Main HTML document
│   ├── css
│   │   └── styles.css    # Custom styles
│   ├── js
│   │   ├── app.js        # Application initialization and event handling
│   │   ├── decoder.js    # JWT decoding logic
│   │   └── validator.js   # JWT validation logic
│   └── utils
│       └── base64.js     # Base64 encoding/decoding utilities
├── assets
│   └── favicon.ico       # Application favicon
└── README.md             # Project documentation
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd jwt-debugger
   ```

2. **Open the Project**: Open `src/index.html` in your web browser to view the application.

3. **Dependencies**: The project uses Bootstrap for styling. Ensure you have an internet connection to load Bootstrap from the CDN.

## Usage
- Enter a JWT in the input field and click the "Decode" button to view its contents.
- Use the "Validate" button to check if the JWT is valid.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.