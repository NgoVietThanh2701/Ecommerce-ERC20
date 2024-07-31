import images from '../assets/shop/img';

export default {
   products: [
      {
         "id": 1,
         "name": "Black Sweatshirt with White Logo",
         "category": 9,
         "price": 123,
         "brand": 1,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 2,
         "name": "White T-shirt",
         "price": 11,
         "category": 10,
         "brand": 2,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 3,
         "name": "Levender Hoodie with Pocket",
         "price": 119,
         "category": 11,
         "brand": 3,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 4,
         "name": "Leaves Pattern White T-shirt",
         "price": 77,
         "category": 12,
         "brand": 4,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 5,
         "name": "White Graphic Crop Top",
         "price": 29,
         "category": 11,
         "brand": 5,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 6,
         "name": "Black Shorts",
         "price": 37,
         "category": 9,
         "brand": 6,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 7,
         "name": "Barboreal Gray Sweat Shirt",
         "price": 77,
         "category": 10,
         "brand": 7,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 8,
         "name": "Yellow Sweatshirt",
         "price": 29,
         "category": 11,
         "brand": 8,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },
      {
         "id": 9,
         "name": "Flower Pattern Black Color T-Shirt",
         "price": 37,
         "category": 12,
         "brand": 2,
         "images": [images.PrOne, images.PrTwo, images.PrThree]
      },

   ],
   categories: [
      {
         id: 1,
         name: "Shirts",
         image: images.MenOne,
         parent: 13
      },
      {
         id: 1,
         name: "Shirts",
         image: images.MenTwo,
         parent: 13
      },
      {
         "id": 3,
         "name": "Plain T-Shirt",
         "image": images.MenThree,
         "parent": 13
      },
      {
         "id": 4,
         "name": "Polo T-Shirt",
         "image": images.MenFour,
         "parent": 13
      },
      {
         "id": 5,
         "name": "Hoodies & Sweetshirt",
         "image": images.MenFive,
         "parent": 13
      },
      {
         "id": 4,
         "name": "Polo T-Shirt",
         "image": images.MenFour,
         "parent": 13
      },
      {
         "id": 5,
         "name": "Hoodies & Sweetshirt",
         "image": images.MenFive,
         "parent": 13
      },
      {
         "id": 9,
         "name": "Hoodies & Sweetshirt",
         "image": "http://localhost:3000/img/women-1.png",
         "parent": 14
      },
      {
         "id": 10,
         "name": "Coats & Parkas",
         "image": "http://localhost:3000/img/women-2.png",
         "parent": 14
      },
      {
         "id": 11,
         "name": "Tees & T-Shirt",
         "image": "http://localhost:3000/img/women-3.png",
         "parent": 14
      },
      {
         "id": 12,
         "name": "Boxers",
         "image": "http://localhost:3000/img/women-4.png",
         "parent": 14
      },
      {
         "id": 13,
         "name": "Men",
         "parent": ""
      },
      {
         "id": 14,
         "name": "Women",
         "parent": ""
      }
   ],
   brands: [
      {
         "id": 1,
         "name": "Jhanvi’s  Brand"
      },
      {
         "id": 2,
         "name": "AS’s  Brand"
      },
      {
         "id": 3,
         "name": "Helen’s  Brand"
      },
      {
         "id": 4,
         "name": "Nike’s  Brand"
      },
      {
         "id": 5,
         "name": "paypal’s  Brand"
      },
      {
         "id": 6,
         "name": "woden’s  Brand"
      },
      {
         "id": 7,
         "name": "MM’s  Brand"
      },
      {
         "id": 8,
         "name": "Priya’s  Brand"
      },
      {
         "id": 9,
         "name": "Roboto’s  Brand"
      },
      {
         "id": 10,
         "name": "Sagar’s  Brand"
      },
      {
         "id": 11,
         "name": "H.M’s  Brand"
      }
   ]
}