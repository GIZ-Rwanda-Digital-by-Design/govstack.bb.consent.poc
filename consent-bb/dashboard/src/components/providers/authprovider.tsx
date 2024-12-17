import { HttpService } from "../../service/HTTPService";
import { addRefreshAuthToAuthProvider } from "react-admin";
import { refreshAuth } from "./refreshAuth";
import { LocalStorageService } from "../../service/localStorageService";

export const myAuthProvider = {
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): any => {
    return HttpService.login(username, password)
      .then((res) => {
        const token = res.data;
        LocalStorageService.updateToken(token);
        HttpService.getOrganisationAdminDetails().then((res) => {
          LocalStorageService.updateUser(res.data);
          HttpService.getAdminAvatarImage().then((imageBase64) => {
            LocalStorageService.updateProfilePic(imageBase64);
          });
        });
        return res.data;
      })
      .catch((error) => {
        throw error.response.data.errorDescription
          ? error.response.data.errorDescription
          : error.response.data.Message;
      });
  },
  checkError: (error: any): Promise<any> => Promise.resolve(),
  checkAuth: () =>
    LocalStorageService.getAccessToken()
      ? Promise.resolve()
      : Promise.reject({ message: false }),
  logout: () => {
    return HttpService.logout()
      .then((res) => {})
      .catch((error) => {});
  },
  getIdentity: (): Promise<any> => {
    try {
      const { lastVisited, name, email } = LocalStorageService.getUser();
      return Promise.resolve({ lastVisited, name, email });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: (params: any): Promise<any> => Promise.resolve(),
};

export const authProvider = addRefreshAuthToAuthProvider(
  myAuthProvider,
  refreshAuth
);
