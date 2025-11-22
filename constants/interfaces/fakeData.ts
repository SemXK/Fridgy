import { CartItemInterface, Product, ProductType, } from "./productInterface";
import { User } from "./usersInterface";

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
    type: "Verdure",
  },
  {
    id: 2,
    type: "Frutta",
  },
  {
    id: 3,
    type: "Carne Bianca",
  },
  {
    id: 4,
    type: "Legumi",
  },
  {
    id: 5,
    type: "Latticini",
  },
  {
    id: 6,
    type: "Formaggi",
  },
  {
    id: 7,
    type: "Pesce",
  },
  {
    id: 8,
    type: "Carne Rossa",
  },
  {
    id: 9,
    type: "Carne",
  },
];

export const productList: Product[] = [
  {
    id: 1,
    name: "Pomodori",
    productTypes: [productType[0]],
    image: require("../../assets/images/foodImages/tomatoes.png"),

    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 2,
    name: "Grana Padano",
    productTypes: [productType[5]],
    image: require("../../assets/images/foodImages/granaPadano.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 3,
    name: "Petti di pollo",
    productTypes: [productType[2]],
    image: require("../../assets/images/foodImages/pettoDiPollo.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 4,
    name: "Yogurt",
    productTypes: [productType[4]],
    image: require("../../assets/images/foodImages/yogurtMuller.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 5,
    name: "Uova",
    productTypes: [],
    image: require("../../assets/images/foodImages/eggs.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 6,
    name: "Latte",
    productTypes: [productType[4]],
    image: require("../../assets/images/foodImages/milk.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 7,
    name: "Burro",
    productTypes: [productType[4]],
    image: require("../../assets/images/foodImages/butter.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 8,
    name: "Wurstel",
    productTypes: [productType[8]],
    image: require("../../assets/images/foodImages/wurstel.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
  {
    id: 9,
    name: "Carne Macinata",
    productTypes: [productType[7]],
    image: require("../../assets/images/foodImages/mincedMeat.png"),
    created_at: new Date(),
    updated_at: new Date(),
    price: 0,
    priceHistory: [],
    description: "",
    taxPercent: 0,
  },
];
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
