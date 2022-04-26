// Adapters have no idea this is a react application
// All they care about is conforming to the interface AuthService

import { AuthService } from "../services/auth";

const fakeUser = {
  email: "luiz@luiz.com",
  id: "123",
  name: "Luiz Chagas",
};

let userChangedCB: Parameters<AuthService["onUserChanged"]>[0] = () => void 0;

// IDEA: Save the user object to localStorage on signIn
// so login persist after refreshing the page
export const FakeAuthService: AuthService = {
  getUser: () => Promise.resolve(null),
  init: () => void 0,
  onUserChanged: (callback) => {
    userChangedCB = callback;
    callback(null);
  },
  signIn: async () => {
    setTimeout(() => {
      userChangedCB(fakeUser);
    }, 1000);
  },
  signOut: async () => {
    userChangedCB(null);
  },
};
