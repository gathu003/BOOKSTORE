const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const email = 'testuser@example.com'; // Email of the user to update
const newPasswordHash = '$2b$10$uHJm9tYdxO37972tWJGgSuExYA4AYftF1CXoELRCwOJqQsNpO8OE6'; // Newly hashed password

async function updatePassword() {
    try {
        await prisma.user.update({
            where: { email: email },
            data: { password: newPasswordHash },
        });
        console.log('Password updated successfully for:', email);
    } catch (error) {
        console.error('Error updating password:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updatePassword();


