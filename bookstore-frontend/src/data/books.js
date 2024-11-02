// src/data/book.js

const books = [
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/61Bdp7XZhDL._AC_UL226_SR226,226_.jpg",
      name: "The Silent Patient",
      price: "11.91",
      date: 24,
      deal: false,
      categorie: ["novel"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/91Yy9b1PseL._AC_UL226_SR226,226_.jpg",
      name: "Danielle Walker's Healthy in a Hurry",
      price: "24.99",
      date: 25,
      deal: false,
      categorie: ["self-dev"],
      gone: false,
      rating: 5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/61clZgj1xZL._AC_UL226_SR226,226_.jpg",
      name: "The Great Reset",
      price: "22.75",
      date: 26,
      deal: false,
      categorie: ["self-dev", "philosophy"],
      gone: false,
      rating: 5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/81I2+bgGMTL._AC_UL226_SR226,226_.jpg",
      name: "Battle for the American Mind",
      price: "17.99",
      date: 27,
      deal: false,
      categorie: ["self-dev"],
      gone: false,
      rating: 5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/81xT2mdyL7L._AC_UL226_SR226,226_.jpg",
      name: "I Love You Like No Otter",
      price: "5.37",
      date: 28,
      deal: false,
      categorie: ["novel"],
      gone: false,
      rating: 5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/71lwvQIGI8L._AC_UL226_SR226,226_.jpg",
      name: "The Return",
      price: "17.38",
      date: 29,
      deal: false,
      categorie: ["self-devl"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://images-na.ssl-images-amazon.com/images/I/81823bTjKHL._AC_UL226_SR226,226_.jpg",
      name: "The Last Thing He Told Me: A Novel",
      price: "13.09",
      date: 30,
      deal: false,
      categorie: ["novel"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://m.media-amazon.com/images/I/51U0RLLU7vS._AC_UF226,226_FMjpg_.jpg",
      name: "The Art of War",
      price: "13.58",
      date: 31,
      deal: true,
      lastPrice: "16.99",
      categorie: ["novel", "philosophy"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://m.media-amazon.com/images/I/51lhjx1Qw3L._AC_UF226,226_FMjpg_.jpg",
      name: "Behave: The Biology of Humans",
      price: "15.87",
      date: 32,
      deal: true,
      lastPrice: "18.09",
      categorie: ["self-dev", "philosophy"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://m.media-amazon.com/images/I/41Byw-nqa3L._AC_UF226,226_FMjpg_.jpg",
      name: "The 21 Irrefutable Laws of Leadership",
      price: "21.49",
      date: 33,
      deal: true,
      lastPrice: "18.49",
      categorie: ["self-dev"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://m.media-amazon.com/images/I/51lIUQSVCsL._AC_UF226,226_FMjpg_.jpg",
      name: "X-Men Omnibus",
      price: "34.99",
      date: 34,
      deal: true,
      lastPrice: "48.16",
      categorie: ["novel"],
      gone: false,
      rating: 4.5,
    },
    {
      cover: "https://m.media-amazon.com/images/I/41S21miKn1S._AC_UF226,226_FMjpg_.jpg",
      name: "Close Your Eyes, Sleep",
      price: "17.98",
      date: 35,
      deal: true,
      lastPrice: "19.99",
      categorie: ["novel"],
      gone: false,
      rating: 4.5,
    },
  ];
  
  export default books;
  
  