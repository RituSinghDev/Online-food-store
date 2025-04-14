const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@gofood.com',
    password: bcrypt.hashSync('123456', 10),
    address: '123 Admin St, City',
    phone: '1234567890'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    address: '456 User St, City',
    phone: '0987654321'
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    address: '789 Test Ave, City',
    phone: '5555555555'
  }
];

const foodItems = [
  {
    name: 'Classic Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese and authentic tomato sauce',
    category: 'Pizza',
    price: 199,
    image: 'https://source.unsplash.com/random/800x600/?pizza',
    options: [
      {
        half: '99',
        full: '199'
      }
    ]
  },
  {
    name: 'Veg Burger',
    description: 'Fresh vegetable patty with cheese, lettuce and special sauce',
    category: 'Burger',
    price: 149,
    image: 'https://source.unsplash.com/random/800x600/?burger',
    options: [
      {
        regular: '149',
        medium: '199',
        large: '249'
      }
    ]
  },
  {
    name: 'Paneer Biryani',
    description: 'Fragrant basmati rice cooked with paneer and authentic spices',
    category: 'Biryani',
    price: 249,
    image: 'https://source.unsplash.com/random/800x600/?biryani',
    options: [
      {
        half: '149',
        full: '249'
      }
    ]
  },
  {
    name: 'Masala Dosa',
    description: 'South Indian specialty with potato masala filling and chutney',
    category: 'South Indian',
    price: 129,
    image: 'https://source.unsplash.com/random/800x600/?dosa',
    options: [
      {
        regular: '129',
        medium: '199'
      }
    ]
  },
  {
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with a gooey center',
    category: 'Dessert',
    price: 99,
    image: 'https://source.unsplash.com/random/800x600/?brownie',
    options: [
      {
        regular: '99',
        medium: '149'
      }
    ]
  },
  {
    name: 'Cold Coffee',
    description: 'Refreshing cold coffee with ice cream',
    category: 'Drinks',
    price: 79,
    image: 'https://source.unsplash.com/random/800x600/?coffee',
    options: [
      {
        regular: '79',
        medium: '99',
        large: '129'
      }
    ]
  }
];

module.exports = { users, foodItems }; 