const categories = [
    { id: 1, name: 'Creatine', image: '/creatine.png', title: 'Muscle Build' },
    { id: 2, name: 'Protein', image: '/protein.jpg', title: 'Muscle Recovery' },
    { id: 3, name: 'Pre-workout', image: '/pre-workout.jpeg', title: 'Pre-workout' },
    { id: 4, name: 'Vitamins', image: '/vitamins.jpg', title: 'Immune Boost' },
    { id: 5, name: 'Equipment', image: '/equipment.jpg', title: 'Gym Equipment' },
];

const products = [
    {
      id: 1,
      name: 'KFD Premium PWR Przedtreningówka Malinowo-Jagodowy',
      categories: ['pre-workout', 'trending'],
      description: 'Product description here.',
      price: 99.99,
      image: '/products/kfd-premium-pwr.jpg',
    },
    {
      id: 2,
      name: 'Ketchup Kotlin Kebab',
      categories: ['creatine', 'trending'],
      description: 'This is a very good ketchup. My favourite. You should try it. Best ketchup on market, trust me. Bro buy this ketchup. Do it now. I wanna beat your ass you motherfucker. Fuck off and get lost you little piece of shit. You want to try me? Come on I will beat your ass.',
      price: 8.99,
      image: '/products/kotlin-ketchup-kebab.jpg',
    },
    {
      id: 3,
      name: 'KFD Premium X-Whey Wafelkowy',
      categories: ['protein'],
      description: 'Product description here.',
      price: 119.99,
      image: '/products/kfd-premium-x-whey.jpg',
    },
    {
      id: 4,
      name: 'KFD Vitapak+ 90 tabletek',
      categories: ['vitamins', 'featured'],
      description: 'Product description here.',
      price: 25.99,
      image: '/products/kfd-vitapak.jpg',
    },
  ];

  const users = [
    {
      id: 1,
      email: 'user@example.com',
      password: 'Password123!',
    },
  ];

export { categories, products, users};