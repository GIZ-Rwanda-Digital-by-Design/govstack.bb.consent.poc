import axios from "axios";
import { ENDPOINTS } from "../settings/settings";
import { LocalStorageService } from "./localStorageService";
import { Organization } from "../interfaces/Organisation";
import { imageBlobToBase64 } from "../utils/imageUtils";
import { UpdateOrganisationReq } from "../interfaces/UpdateOrganisation";
import {
  DataAgreementsResponse,
  // convertPurposeForClient,
  DataAgreement,
} from "../interfaces/DataAgreement";
import { convertConsentRecordsForClient } from "./adapter";
import { convertViewLogsForClient } from "./adapter";
import { configStore } from "../store/configStore";
import { autorun } from "mobx";



const httpClient = axios.create({
  baseURL: configStore.baseUrl,
});


const disposer = autorun(() => {
  httpClient.defaults.baseURL = configStore.baseUrl;
});

const getAuthenticatedHeaders = () => {
  return {
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };
};

export const refreshTokenAndUpdateLocalStorage = async () => {
  try {
    const refreshToken = LocalStorageService.getRefreshToken();
    const res = await HttpService.refreshToken(refreshToken);
    LocalStorageService.updateToken(res.data); // Assuming this function is implemented to update token in local storage
    return res.data.accessToken;
  } catch (error) {
    console.error("Unable to refresh token", error);
    throw error; // Re-throwing error after logging it for further handling in the calling function
  }
};

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== ENDPOINTS.refreshToken()
    ) {
      originalRequest._retry = true;
      try {
        // Using the new function here
        const newToken = await refreshTokenAndUpdateLocalStorage();

        // Update Authorization in the original request and retry it
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Further handling token refresh error if needed, e.g., redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const HttpService = {
  login: async (username: string, password: string): Promise<any> => {
    const payload: object = {
      username: username,
      password: password,
    };
    return httpClient.post(ENDPOINTS.login(), payload);
  },
  logout: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    const refresh_token = LocalStorageService.getRefreshToken();
    const payload: object = {
      refreshtoken: refresh_token,
    };
    return httpClient.post(ENDPOINTS.logout(), payload, config);
  },
  refreshToken: async (refresh_token: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    const payload: object = {
      clientId: configStore.clientId,
      refreshToken: refresh_token,
    };
    return httpClient.post(ENDPOINTS.refreshToken(), payload, config);
  },
  getOrganisationDetails: async (): Promise<Organization> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.getOrganisationDetails(), config)
      .then((res) => {
        return res.data.organisation;
      });
  },
  getCoverImage: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient.get(ENDPOINTS.getCoverImage(), config).then((res) => {
      return imageBlobToBase64(res.data);
    });
  },
  getLogoImage: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient.get(ENDPOINTS.getLogoImage(), config).then((res) => {
      return imageBlobToBase64(res.data);
    });
  },
  updateOrganisationLogoImage: async (formData: any): Promise<Organization> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .post(ENDPOINTS.updateOrganisationLogoImage(), payload, config)
      .then((res) => {
        return res.data.Organization;
      });
  },
  updateOrganisationCoverImage: async (
    formData: any
  ): Promise<Organization> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .post(ENDPOINTS.updateOrganisationCoverImage(), payload, config)
      .then((res) => {
        return res.data.Organization;
      });
  },
  updateOrganisationDetails: async (
    payload: UpdateOrganisationReq
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateOrganisationDetails(),
      payload,
      config
    );
  },
  listDataAgreements: async (
    offsetValue: number,
    pageSize: number,
    filter: string,
    revisionId: string | undefined,
    includeRevisions: boolean | string
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listDataAgreements(offsetValue, pageSize, filter, revisionId, includeRevisions), config)
      .then((res) => {
        const dataAgreements: DataAgreementsResponse = res.data;
        return dataAgreements
      });
  },
  addDataAgreements: async (payload: DataAgreement): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addDataAgreements(), payload, config);
  },
  listDataAttributes: async (
    offsetValue: number,
    pageSize: number,
    filter: string
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listDataAttributes(offsetValue, pageSize, filter), config)
      .then((res) => {
        return res.data;
      });
  },
  addDataAttributes: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addDataAttributes(), payload, config);
  },
  updateDataAttributes: async (
    payload: any,
    dataAttributeId: string | undefined
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateDataAttributesById(dataAttributeId),
      payload,
      config
    );
  },
  deleteDataAgreement: async (dataAgreementId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.delete(
      ENDPOINTS.deleteDataAgreement(dataAgreementId),
      config
    );
  },
  getDataAgreementByID: async (dataAgreementId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(
      ENDPOINTS.getDataAgreementByID(dataAgreementId),
      config
    );
  },
  updateDataAgreementById: async (
    payload: any,
    dataAgreementId: string | undefined
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateDataAgreementById(dataAgreementId),
      payload,
      config
    );
  },
  listAllPolicies: async (): Promise<any[]> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.listAllPolicies(), config).then((res) => {
      return res.data.policies;
    });
  },
  addPolicies: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addPolicy(), payload, config);
  },
  updatePoliciesById: async (
    payload: any,
    policyId: string | undefined
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updatePolicyById(policyId),
      payload,
      config
    );
  },
  addIndividualUsingByCsv: async (formData: any): Promise<any> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .post(ENDPOINTS.addIndividualUsingByCsv(), payload, config)
      .then((res) => {
        return res.data;
      });
  },
  addNewIDP: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addNewIDP(), payload, config);
  },
  listAllIdps: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.listAllIdps(), config).then((res) => {
      return res.data;
    });
  },
  deleteIdpBy: async (idpId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.delete(ENDPOINTS.deleteIdpBy(idpId), config);
  },
  updateIdpByid: async (payload: any, idpId: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(ENDPOINTS.updateIdpByid(idpId), payload, config);
  },

  updateAdminAvatar: async (formData: any): Promise<any> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .put(ENDPOINTS.updateAdminAvatar(), payload, config)
      .then((res) => {
        return res.data;
      });
  },
  getAdminAvatarImage: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient
      .get(ENDPOINTS.getAdminAvatarImage(), config)
      .then((res) => {
        return imageBlobToBase64(res.data);
      });
  },
  getOrganisationAdminDetails: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.getOrganisationAdminDetails(), config);
  },
  updateOrganisationAdminDetails: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateOrganisationAdminDetails(),
      payload,
      config
    );
  },
  resetPassword: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(ENDPOINTS.resetPassword(), payload, config);
  },
  listAllDataAgreementRecords: async (
    offsetValue: number,
    pageSize: number,
    filter: any
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(
        ENDPOINTS.listAllDataAgreementRecords(offsetValue, pageSize, filter),
        config
      )
      .then((res) => {
        return convertConsentRecordsForClient(res.data);
      });
  },
  getDataAgreementRecordByID: async (recordId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(
      ENDPOINTS.getDataAgreementRecordByID(recordId),
      config
    );
  },
  listAllAdminLogs: async (
    offsetValue: number,
    pageSize: number,
    filter: number
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listAllAdminLogs(offsetValue, pageSize, filter), config)
      .then((res) => {
        const allLogs: DataAgreementsResponse = res.data;
        return convertViewLogsForClient(allLogs);
      });
  },
  listAllApiKeys: async (
    offsetValue: number,
    pageSize: number
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listAllApiKeys(offsetValue, pageSize), config)
      .then((res) => {
        const allLogs: DataAgreementsResponse = res.data;
        return allLogs;
      });
  },
  addNewApiKey: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addNewApiKey(), payload, config);
  },
  deleteApiKey: async (apiKeyId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.delete(ENDPOINTS.deleteApiKey(apiKeyId), config);
  },
  listWebhookContentTypes: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listWebhookContentTypes(), config)
      .then((res) => {
        const allLogs: DataAgreementsResponse = res.data;
        return allLogs;
      });
  },
  addWebhooks: async (payload: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addWebhooks(), payload, config);
  },
  listWebhookEventTypes: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listWebhookEventTypes(), config)
      .then((res) => {
        const allLogs: DataAgreementsResponse = res.data;
        return allLogs;
      });
  },
  listAllWebhooks: async (
    offsetValue: number,
    pageSize: number
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listAllWebhooks(offsetValue, pageSize), config)
      .then((res) => {
        const allLogs: DataAgreementsResponse = res.data;
        return allLogs;
      });
  },
  updateWebhookById: async (
    payload: any,
    webhookId: string | undefined
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateWebhookById(webhookId),
      payload,
      config
    );
  },
  getWebhookById: async (webhookId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.getWebhookById(webhookId), config);
  },
  deleteWebhook: async (apiKeyId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.delete(ENDPOINTS.deleteWebhook(apiKeyId), config);
  },
  getWebhooksRecentDeliveries: async (webhookId: any): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(
      ENDPOINTS.getWebhooksRecentDeliveries(webhookId),
      config
    );
  },
  getPrivacyBoard: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.getPrivacyBoard(), config);
  },
  getStatus: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.getStatus(), config);
  },
};
