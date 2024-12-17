import { action, makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

class ConfigStore {
  baseUrl = "http://staging-consent-bb-api.igrant.io/v2";
  clientId = "risa-app";
  appVersion = "v2023.10.4";

  constructor() {
    makeAutoObservable(this);
  }

  setBaseUrl(baseUrl: any) {
    this.baseUrl = baseUrl;
  }

  setClientId(clientId: any) {
    this.clientId = clientId;
  }

  setAppVersion(appVersion: any) {
    this.appVersion = appVersion;
  }

  get BaseUrl() {
    return this.baseUrl;
  }

  get ClientId() {
    return this.clientId;
  }

  get AppVersion() {
    return this.appVersion;
  }
}

export const configStore = new ConfigStore();
