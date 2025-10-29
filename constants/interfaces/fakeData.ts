import { FoodType, PackageType, Product } from "./productInterface";
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

export const foodTypes: FoodType[] = [
  {
    id: 1,
    type: "Verdure",
    color: "bg-emerald-700",
  },
  {
    id: 2,
    type: "Frutta",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    type: "Carne Bianca",
    color: "bg-rose-500",
  },
  {
    id: 4,
    type: "Legumi",
    color: "bg-amber-900",
  },
  {
    id: 5,
    type: "Latticini",
    color: "bg-emerald-500 stone-300",
  },
  {
    id: 6,
    type: "Formaggi",
    color: "bg-amber-600",
  },
  {
    id: 7,
    type: "Pesce",
    color: "bg-grey-500",
  },
];

export const packageList: PackageType[] = [
  {
    id: 1,
    package: "Lattina",
  },
  {
    id: 2,
    package: "Barattolo",
  },
  {
    id: 3,
    package: "Cartone",
  },
  {
    id: 4,
    package: "Bottiglia",
  },
  {
    id: 5,
    package: "Confezione di plastica",
  },
];

export const productList: Product[] = [
  {
    id: 1,
    name: "Pomodori",
    quantity: "2",
    package: packageList[4],
    foodTypes: [foodTypes[0]],
    image: require("../../assets/images/foodImages/tomatoes.png"),

    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "Grana Padano",
    quantity: "1",
    foodTypes: [foodTypes[5]],
    image: require("../../assets/images/foodImages/granaPadano.png"),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    name: "Petti di pollo",
    quantity: "4",
    foodTypes: [foodTypes[2]],
    image: require("../../assets/images/foodImages/pettoDiPollo.png"),
    created_at: new Date(),
    updated_at: new Date(),
  },
  // {
  //   id: 4,
  //   name: "Tonno",
  //   package: packageList[0],
  //   quantity: "4",
  //   foodTypes: [foodTypes[3]],
  //   created_at: new Date(),
  //   updated_at: new Date(),
  // },
];
