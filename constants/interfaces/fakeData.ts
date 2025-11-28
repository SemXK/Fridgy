import { CartItemInterface, Discount, Product, ProductType, } from "./productInterface";
import { User } from "./usersInterface";

// * Fake Constants
export const currentUser: User = {
  id: 1,
  name: "Utente",
  surname: "Cognome",
  username: "utente1234",
  email: "utente123@gmail.com",
  hatedProducts: [],
  favouriteProducts: [],
  created_at: new Date(),
  updated_at: new Date(),
};
export const productType: ProductType[] = [
  {
    id: 1,
    image: require("../../assets/images/foodVectors/verdure.png"),
    type: "Verdure",
  },
  {
    id: 2,
    image: require("../../assets/images/foodVectors/fruits.png"),
    type: "Frutta",
  },
  {
    id: 3,
    image: require("../../assets/images/foodVectors/white_meat.png"),
    type: "Carne Bianca",
  },
  {
    id: 4,
    image: require("../../assets/images/foodVectors/legumes.png"),
    type: "Legumi",
  },
  {
    id: 5,
    image: require("../../assets/images/foodVectors/milk.png"),
    type: "Latticini",
  },
  {
    id: 6,
    image: require("../../assets/images/foodVectors/cheese.png"),
    type: "Formaggi",
  },
  {
    id: 7,
    image: require("../../assets/images/foodVectors/fish.png"),
    type: "Pesce",
  },
  {
    id: 8,
    image: require("../../assets/images/foodVectors/red_meat.png"),
    type: "Carne Rossa",
  },
  {
    id: 9,
    image: require("../../assets/images/foodVectors/meat.png"),
    type: "Carne",
  },
];
export const discountList: Discount[] = [
  {
    id: 1,
    name: "Verdure e Ortaggi",
    image: require("../../assets/images/discountImages/vegetables.jpg"),
    discount: 10
  },
  {
    id: 2,
    name: "Dolci, Merendine e Snack",
    image: require("../../assets/images/discountImages/sweets.jpg"),

    discount: 30
  },
  {
    id: 3,
    name: "Pasta e Riso",
    image: require("../../assets/images/discountImages/pasta.jpg"),
    discount: 25
  }, 
]

// % Implementata 
export const productList: Product[] = [];

// * Variables
export let currentCart: CartItemInterface[] = [
  {
    productId: 1,
    quantity: 2,
    product: productList[0],
    userId: currentUser.id, 
  },
  {
    productId: 3,
    quantity: 2,
    product: productList[3],
    userId: currentUser.id, 
  },
]
export function changeCurrentCart(newCart: any) {
  currentCart = newCart;
}
