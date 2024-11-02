const bcrypt = require('bcrypt');

const passwordToTest = 'password1234'; // Password you registered
const storedHash = '$2b$10$fx7QN.xlENfLHAH78eH0g.1jpZixHv4lFHJ9VCLfOMN6Mk/BKJLka'; // The hashed password from your database

// Hash the known password to see what it generates
bcrypt.hash(passwordToTest, 10, (err, newHash) => {
    if (err) throw err;
    console.log("Newly hashed password:", newHash);

    // Compare the newly hashed password with the stored hash
    bcrypt.compare(passwordToTest, storedHash, (err, result) => {
        if (err) throw err;
        console.log("Password matches:", result); // Should be true if it matches
    });
});

