const crypto = require('crypto');

// Function to base64 URL encode a string
function base64UrlEncode(str) {
    return Buffer.from(str).toString('base64')
        .replace(/=+$/, '') // Remove trailing '='
        .replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_'); // Convert '/' to '_'
}

// Function to base64 URL decode a string
function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return Buffer.from(str, 'base64').toString();
}

// Function to verify the JWT
function verifyJwt(token, secret) {
    // Split the token into its parts
    const [header64, payload64, signature64] = token.split('.');

    // Decode Header and Payload
    const header = JSON.parse(base64UrlDecode(header64));
    const payload = JSON.parse(base64UrlDecode(payload64));

    // Recreate the signature
    const data = `${header64}.${payload64}`; // Concatenate header and payload
    const signature = base64UrlEncode(crypto.createHmac('sha256', secret).update(data).digest()); // Create the new signature

    // Compare the signatures
    if (signature === signature64) {
        console.log('Token is valid');
        return payload; // Return the payload if valid
    } else {
        console.log('Invalid token');
        return null; // Invalid token
    }
}

// Export the verifyJwt function
module.exports = { verifyJwt };

