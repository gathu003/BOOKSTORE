const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const email = 'gayathrisubhash038@gmail.com';
  const password = 'Bookstore@2003'; // Ensure to hash this in production
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log('Admin user created or already exists:', adminUser);

  // Create some authors
  const authorsData = [
    { name: 'Author One' },
    { name: 'Author Two' },
  ];

  for (const author of authorsData) {
    await prisma.author.upsert({
      where: { name: author.name }, // Assuming the name is unique
      update: {},
      create: {
        name: author.name,
      },
    });
  }

  // Fetch created authors for logging
  const createdAuthors = await prisma.author.findMany();
  console.log('Authors created or already exist:', createdAuthors);

  // Create some books
  await prisma.book.upsert({
    where: { title: 'Book One' },
    update: {},
    create: {
      title: 'Book One',
      description: 'Description of Book One',
      price: 9.99,
      genre: 'Fiction',
      pdfUrl: 'http://example.com/book-one.pdf',
      thumbnail: 'http://example.com/book-one-thumbnail.jpg',
      publisher: 'Publisher One',
      authors: {
        connect: [
          { name: 'Author One' }, 
          { name: 'Author Two' } // Connecting authors by name
        ],
      },
      userId: adminUser.id,
    },
  });

  console.log('Book created or already exists.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




