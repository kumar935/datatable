export const getDummyRows = (rowCount = 10) => {
  let products = [
    "Pen",
    "Apple",
    "Pineapple",
    "Pen",
    "Apple",
    "Pineapple",
    "Pen",
    "Apple",
    "Pineapple",
    "Pen",
    "Apple",
    "Pineapple"
  ];
  let categories = [
    "Stationary",
    "fruit",
    "electronic",
    "Stationary",
    "fruit",
    "electronic",
    "Stationary",
    "fruit",
    "electronic",
    "Stationary",
    "fruit",
    "electronic"
  ];
  let availabilities = [
    "AVAILABLE",
    "AVAILABLE",
    "OUT OF STOCK",
    "AVAILABLE",
    "AVAILABLE",
    "OUT OF STOCK",
    "AVAILABLE",
    "AVAILABLE",
    "OUT OF STOCK",
    "AVAILABLE",
    "AVAILABLE",
    "OUT OF STOCK"
  ];

  return [...Array(rowCount)].map((v, i) => {
    return {
      id: i + 1,
      product: products[Math.floor(Math.random() * 10)],
      category: categories[Math.floor(Math.random() * 10)],
      availability: availabilities[Math.floor(Math.random() * 10)],
      price: 17 * Math.floor(Math.random() * 10)
    };
  });
}

export const dummyRows = [
  {
    id: 1,
    product: "Pen",
    category: "fruit",
    availability: "AVAILABLE",
    price: 85
  },
  {
    id: 2,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 3,
    product: "Apple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 153
  },
  {
    id: 4,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 5,
    product: "Pineapple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 6,
    product: "Pen",
    category: "fruit",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 7,
    product: "Pineapple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 34
  },
  {
    id: 8,
    product: "Pen",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 119
  },
  {
    id: 9,
    product: "Apple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 10,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 11,
    product: "Pineapple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 12,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 13,
    product: "Pineapple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 51
  },
  {
    id: 14,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 15,
    product: "Pen",
    category: "fruit",
    availability: "AVAILABLE",
    price: 34
  },
  {
    id: 16,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 17,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 18,
    product: "Pineapple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 19,
    product: "Pineapple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 34
  },
  {
    id: 20,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 21,
    product: "Apple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 17
  },
  {
    id: 22,
    product: "Apple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 136
  },
  {
    id: 23,
    product: "Pen",
    category: "fruit",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 24,
    product: "Pen",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 136
  },
  {
    id: 25,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 26,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 27,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 28,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 29,
    product: "Pen",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 85
  },
  {
    id: 30,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 31,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 32,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 33,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 34,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 34
  },
  {
    id: 35,
    product: "Pineapple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 36,
    product: "Pen",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 51
  },
  {
    id: 37,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 38,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 39,
    product: "Pen",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 17
  },
  {
    id: 40,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 41,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 42,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 43,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 44,
    product: "Pineapple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 45,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 46,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 47,
    product: "Apple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 48,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 49,
    product: "Apple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 153
  },
  {
    id: 50,
    product: "Apple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 34
  },
  {
    id: 51,
    product: "Pen",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 0
  },
  {
    id: 52,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 53,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 54,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 136
  },
  {
    id: 55,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 56,
    product: "Pen",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 153
  },
  {
    id: 57,
    product: "Pineapple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 0
  },
  {
    id: 58,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 136
  },
  {
    id: 59,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 60,
    product: "Pineapple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 61,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 62,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 63,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 64,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 65,
    product: "Apple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 102
  },
  {
    id: 66,
    product: "Apple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 119
  },
  {
    id: 67,
    product: "Pen",
    category: "fruit",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 68,
    product: "Pen",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 136
  },
  {
    id: 69,
    product: "Pen",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 34
  },
  {
    id: 70,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 71,
    product: "Pineapple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 72,
    product: "Apple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 73,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 74,
    product: "Pineapple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 34
  },
  {
    id: 75,
    product: "Pineapple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: 51
  },
  {
    id: 76,
    product: "Pineapple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 77,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 68
  },
  {
    id: 78,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 136
  },
  {
    id: 79,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 80,
    product: "Apple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 68
  },
  {
    id: 81,
    product: "Pineapple",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 51
  },
  {
    id: 82,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 83,
    product: "Apple",
    category: "fruit",
    availability: "AVAILABLE",
    price: 136
  },
  {
    id: 84,
    product: "Apple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 85
  },
  {
    id: 85,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 102
  },
  {
    id: 86,
    product: "Apple",
    category: "electronic",
    availability: "OUT OF STOCK",
    price: 68
  },
  {
    id: 87,
    product: "Pineapple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 88,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 89,
    product: "Pen",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 153
  },
  {
    id: 90,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 51
  },
  {
    id: 91,
    product: "Pineapple",
    category: "electronic",
    availability: "AVAILABLE",
    price: 85
  },
  {
    id: 92,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 93,
    product: "Pen",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 17
  },
  {
    id: 94,
    product: "Pen",
    category: "Stationary",
    availability: "OUT OF STOCK",
    price: 34
  },
  {
    id: 95,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 96,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 119
  },
  {
    id: 97,
    product: "Pen",
    category: "electronic",
    availability: "AVAILABLE",
    price: 153
  },
  {
    id: 98,
    product: "Pineapple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 85
  },
  {
    id: 99,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 0
  },
  {
    id: 100,
    product: "Apple",
    category: "Stationary",
    availability: "AVAILABLE",
    price: 102
  }
];
