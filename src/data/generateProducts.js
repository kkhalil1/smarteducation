import { faker } from '@faker-js/faker';
const imageSrc = 'https://static.vecteezy.com/system/resources/previews/';
let cachedProducts = null;
export const generateProducts = (count = 10000) => {
  if (cachedProducts) return cachedProducts;

  cachedProducts = Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price(5, 100)),
    description: faker.commerce.productDescription(),
    category: 'Books',
    image: getRandomString([
      `${imageSrc}057/455/624/large_2x/impressive-modern-open-book-with-turned-pages-angled-view-cutout-high-resolution-png.png`,
      `${imageSrc}057/443/768/large_2x/extraordinary-contemporary-leather-bound-travel-journal-with-blank-pages-isolated-high-quality-png.png`,
      `${imageSrc}065/653/480/large_2x/closed-dark-hardcover-book-with-blank-pages-on-transparent-background-png.png`,
      `${imageSrc}014/289/380/large_2x/isometric-books-3d-render-png.png`,
      `${imageSrc}058/686/250/non_2x/colorful-stack-of-hardcover-books-education-reading-knowledge-concept-png.png`,
      `${imageSrc}057/455/444/large_2x/extraordinary-creative-open-book-with-blank-pages-isolated-element-premium-png.png`,
      `${imageSrc}017/785/291/large_2x/realistic-books-3d-render-png.png`,
      `${imageSrc}044/641/199/large_2x/solid-color-book-for-mockup-on-transparent-background-png.png`,
      `${imageSrc}012/896/697/non_2x/2-closed-book-with-black-cove-free-png.png`
    ]),
    rating: {
      rate: parseFloat((Math.random() * 5).toFixed(1)),
      count: faker.datatype.number({ min: 50, max: 500 }),
    },
  }));

  return cachedProducts;
};


  function getRandomString(strings) {
    if (!Array.isArray(strings) || strings.length === 0) {
      throw new Error("Input must be a non-empty array of strings.");
    }
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  }
  