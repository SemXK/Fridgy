import { AccessTypeEnum } from "../enums/accessType";
import { StateRoute } from "../interfaces/common";
import { TypeObject } from "../interfaces/usersInterface";

/**
 * Filters the tab bar based on the user type
 * @param list of all routes of the application (in the current tab)
 * @param accessType the access type of the user
 * @returns list of filtered user to pass to the tab bar
 */
export function GetAllowedRoutes (routes: StateRoute[], accessType?: TypeObject): StateRoute[] {
  // Default routes, accessible to everyone
  let allowedRoutes: string[] = []
  switch(accessType?.id) {
    case AccessTypeEnum.Utente:
      allowedRoutes = ['index', '(fridge-tab)','(user-diet-tab)', '(profile-tab)']
      break;

    case AccessTypeEnum.Produttore:
      allowedRoutes = ['index', '(store-tab)', '(profile-tab)']
      break;

    case AccessTypeEnum.Nutrizionista:
      allowedRoutes = ['index','(nutritionist-diet-tab)', '(nutritionist-users-tab)', '(profile-tab)']
      break;

    default:
      allowedRoutes = ['index', '(fridge-tab)', '(profile-tab)']
      break;
    }
  return routes.filter((route) => allowedRoutes.includes(route.name))

}

