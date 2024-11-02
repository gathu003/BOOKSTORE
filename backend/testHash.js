const bcrypt = require('bcrypt');

const testPassword = 'password1234'; // The password you want to hash

(async () => {
    try {
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        console.log('Hashed password for test user:', hashedPassword);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
})();

