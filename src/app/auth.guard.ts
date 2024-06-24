import { CanActivateFn } from '@angular/router';
import { getAuth } from "firebase/auth";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const user = auth.currentUser;
  // coerce to boolean
  const isLoggedIn = !!user;
  return isLoggedIn;
};
