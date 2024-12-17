import { LocalStorageService } from "../../service/localStorageService";
import { AccessTokenClaims } from "../../interfaces/AccessToken";
import { refreshTokenAndUpdateLocalStorage } from "../../service/HTTPService";

export const refreshAuth = async () => {
  const accessToken = LocalStorageService.getAccessToken();
  if (accessToken) {
    const claims: AccessTokenClaims = JSON.parse(
      atob(accessToken.split(".")[1])
    );

    const currentTime = Date.now() / 1000 + 300;
    const expiryTime = claims.exp;
    if (expiryTime < currentTime) {
      // This function will fetch the new tokens from the authentication service and update them in localStorage
      try {
        await refreshTokenAndUpdateLocalStorage();
        console.log("Successfully refreshed the token");
      } catch (error) {
        console.error("Failed to refresh token", error);
        return Promise.reject({ redirectTo: '/login', message: false });
      }
    }
  }
  return Promise.resolve();
};
