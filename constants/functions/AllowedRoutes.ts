import { AccessTypeEnum } from "../enums/accessType";
import { StateRoute } from "../interfaces/common";
import { UserAccessType } from "../interfaces/usersInterface";

/**
 * Filters the tab bar based on the user type
 * @param list of all routes of the application (in the current tab)
 * @param accessType the access type of the user
 * @returns list of filtered user to pass to the tab bar
 */
export function GetAllowedRoutes (routes: StateRoute[], accessType?: UserAccessType): StateRoute[] {
  // Default routes, accessible to everyone
  let allowedRoutes: string[] = []
  console.log("id", accessType?.id)
  switch(accessType?.id) {
    case AccessTypeEnum.Utente:
      allowedRoutes = ['index', '(fridge-tab)', 'productDetail', '(profile-tab)']
      break;

    case AccessTypeEnum.Produttore:
      allowedRoutes = ['index', '(store-tab)', '(profile-tab)']
      break;

    default:
      allowedRoutes = ['index', '(fridge-tab)', 'productDetail', '(profile-tab)']
      break;
    }
  return routes.filter((route) => allowedRoutes.includes(route.name))

}

