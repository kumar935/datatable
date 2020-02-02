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
      srNo: i + 1,
      product: products[Math.floor(Math.random() * 10)],
      category: categories[Math.floor(Math.random() * 10)],
      availability: availabilities[Math.floor(Math.random() * 10)],
      price: 17 * Math.floor(Math.random() * 10)
    };
  });
};

// const dummyCols = [
//   {
//     id: "action",
//     label: "Select",
//     Header: <input type="checkbox" onChange={this.toggleSelectAll} />,
//     Cell: this.actionCell,
//     filterable: false
//   },
//   {
//     id: "srNo",
//     label: "Sr No"
//   },
//   {
//     id: "product", // Uniq ID to identify column
//     label: "Product",
//     width: "100px"
//   },
//   {
//     id: "availability",
//     label: "Availability"
//   },
//   {
//     id: "category",
//     label: "Category"
//   },
//   {
//     id: "price",
//     label: "Price",
//     numeric: true // Right Align
//   }
// ];
