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
    // You can add more authors here as needed
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

  // Book data from your provided list
  const booksData = [
    {
      title: "The Silent Patient",
      description: "A psychological thriller about a woman's act of violence against her husband.",
      price: 11.91,
      genre: "novel",
      pdfUrl: "http://example.com/the-silent-patient.pdf",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/61Bdp7XZhDL._AC_UL226_SR226,226_.jpg",
      publisher: "Publisher One",
      authors: {
        connect: [{ name: 'Author One' }] // Connect with appropriate authors
      },
      userId: adminUser.id,
    },
    {
      title: "Danielle Walker's Healthy in a Hurry",
      description: "Quick and easy recipes for healthy eating.",
      price: 24.99,
      genre: "self-dev",
      pdfUrl: "http://example.com/danielle-walker.pdf",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/91Yy9b1PseL._AC_UL226_SR226,226_.jpg",
      publisher: "Publisher Two",
      authors: {
        connect: [{ name: 'Author Two' }] // Connect with appropriate authors
      },
      userId: adminUser.id,
    },
    {
      title: "The Great Reset",
      description: "An exploration of economic and social change.",
      price: 22.75,
      genre: "self-dev, philosophy",
      pdfUrl: "http://example.com/the-great-reset.pdf",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/61clZgj1xZL._AC_UL226_SR226,226_.jpg",
      publisher: "Publisher Three",
      authors: {
        connect: [{ name: 'Author One' }] // Connect with appropriate authors
      },
      userId: adminUser.id,
    },
    // ... Add the rest of the books similarly
  ];

  // Create books in the database
  for (const book of booksData) {
    await prisma.book.upsert({
      where: { title: book.title },
      update: {},
      create: book,
    });
  }

  console.log('Books created or already exist.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




