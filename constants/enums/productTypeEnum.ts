import { MaterialCommunityIcons } from "@expo/vector-icons";

type MdiIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export const ProductTypeIcon = {
  FruttaIcon: 'food-apple',
  VerduraIcon: 'carrot',
  CarneIcon: 'food-steak',
  PesceIcon: 'fish',
  LatticiniIcon: 'cup',                  // milk/dairy
  CerealiIcon: 'barley',
  LegumiIcon: 'soy-sauce',               // closest available bean/legume-like icon
  UovaIcon: 'egg',
  'Pane e prodotti da forno': 'bread-slice',
  PastaIcon: 'noodles',
  SpezieIcon: 'shaker',                  // seasoning shaker
  'Oli e grassi': 'oil',
  'Frutta secca': 'peanut',
  BevandeIcon: 'cup-water',
  SurgelatiIcon: 'snowflake',
  // ConserveIcon: 'canister',
  SalseIcon: 'bottle-tonic',
  FormaggiIcon: 'cheese',
  SalumiIcon: 'food-drumstick',
  DefaultIcon: 'food'
} as const satisfies Record<string, MdiIconName>;

export function productTypeToIcon(prodType: string): MdiIconName {
  switch (prodType) {
    case 'Frutta':
      return ProductTypeIcon.FruttaIcon
    case 'Verdura':
      return ProductTypeIcon.VerduraIcon
    case 'Carne':
      return ProductTypeIcon.CarneIcon
    case 'Pesce':
      return ProductTypeIcon.PesceIcon
    case 'Latticini':
      return ProductTypeIcon.LatticiniIcon
    case 'Cereali':
      return ProductTypeIcon.CerealiIcon
    case 'Legumi':
      return ProductTypeIcon.LegumiIcon
    case 'Uova':
      return ProductTypeIcon.UovaIcon
    case 'Pane e prodotti da forno':
      return ProductTypeIcon['Pane e prodotti da forno']
    case 'Pasta':
      return ProductTypeIcon.PastaIcon
    case 'Spezie':
      return ProductTypeIcon.SpezieIcon
    case 'Oli e grassi':
      return ProductTypeIcon['Oli e grassi']
    case 'Frutta secca':
      return ProductTypeIcon['Frutta secca']
    case 'Bevande':
      return ProductTypeIcon.BevandeIcon
    case 'Surgelati':
      return ProductTypeIcon.SurgelatiIcon
    // case 'Conserve':
    //   return ProductTypeIcon.ConserveIcon
    case 'Salse':
      return ProductTypeIcon.SalseIcon
    case 'Formaggi':
      return ProductTypeIcon.FormaggiIcon
    case 'Salumi':
      return ProductTypeIcon.SalumiIcon
    default:
      return ProductTypeIcon.DefaultIcon
  }
}