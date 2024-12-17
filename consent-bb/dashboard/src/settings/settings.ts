export const ENDPOINTS = {
  login: () => {
    return "/onboard/admin/login";
  },
  logout: () => {return "/onboard/logout"},
  refreshToken: () => {
    return "/onboard/token/refresh";
  },
  getOrganisationDetails: () => {
    return `/onboard/organisation`;
  },
  updateOrganisationLogoImage: () => {
    return `/onboard/organisation/logoimage`;
  },
  updateOrganisationCoverImage: () => {
    return `/onboard/organisation/coverimage`;
  },
  getCoverImage: () => {
    return `/onboard/organisation/coverimage`;
  },
  getLogoImage: () => {
    return `/onboard/organisation/logoimage`;
  },
  updateOrganisationDetails: () => {
    return `/onboard/organisation`;
  },
  listDataAgreements: (
    offsetValue: number,
    pageSize: number,
    filter: string,
    revisionId: string | undefined,
    includeRevisions: boolean | string
  ) => {
    return `/config/data-agreements?limit=${pageSize}&offset=${offsetValue}${
      filter === "complete" ? `&lifecycle=complete` : ""}&includeRevisions=${includeRevisions}${
      revisionId !== "" ? `&revisionId=${revisionId}` : ""}`
  },
  addDataAgreements: () => {
    return "/config/data-agreement";
  },
  listDataAttributes: (
    offsetValue: number,
    pageSize: number,
    filter: string
  ) => {
    return `/config/data-agreements/data-attributes?limit=${pageSize}&offset=${offsetValue}${
      filter !== "all" ? `&methodOfUse=${filter}` : ""
    }`;
  },
  addDataAttributes: () => {
    return "/config/data-agreements/data-attribute";
  },
  updateDataAttributesById: (dataAttributeId: string | undefined) => {
    return `/config/data-agreements/data-attribute/${dataAttributeId}`;
  },
  deleteDataAgreement: (dataAgreementId: string) => {
    return `/config/data-agreement/${dataAgreementId}`;
  },
  getDataAgreementByID: (dataAgreementId: string) => {
    return `/config/data-agreement/${dataAgreementId}`;
  },
  updateDataAgreementById: (dataAgreementId: string | undefined) => {
    return `/config/data-agreement/${dataAgreementId}`;
  },
  listAllPolicies: () => {
    return `/config/policies`;
  },
  addPolicy: () => {
    return `/config/policy`;
  },
  updatePolicyById: (policyId: string | undefined) => {
    return `/config/policy/${policyId}`;
  },
  updateAdminAvatar: () => {
    return "/onboard/admin/avatarimage";
  },
  getAdminAvatarImage: () => {
    return "/onboard/admin/avatarimage";
  },
  getOrganisationAdminDetails: () => {
    return "/onboard/admin";
  },
  updateOrganisationAdminDetails: () => {
    return "/onboard/admin";
  },
  resetPassword: () => {
    return "/onboard/password/reset";
  },
  addIndividualUsingByCsv: () => {
    return "/config/individual/upload";
  },
  addNewIDP: () => {
    return "/config/idp/open-id";
  },
  listAllIdps: () => {
    return "/config/idp/open-ids";
  },
  deleteIdpBy: (idpId: string) => {
    return `/config/idp/open-id/${idpId}`;
  },
  updateIdpByid: (idpId: string) => {
    return `/config/idp/open-id/${idpId}`;
  },
  listAllAdminLogs: (offsetValue: number, pageSize: number, filter: number) => {
    return `/audit/admin/logs?limit=${pageSize}&offset=${offsetValue}${
      filter !== 0 ? `&logType=${filter}` : ""
    }`;
  },
  listAllDataAgreementRecords: (
    offsetValue: number,
    pageSize: number,
    filter: any
  ) => {
    return `/audit/consent-records?limit=${pageSize}&offset=${offsetValue}${
      filter.filterType !== "all" ? `&${filter.filterType}=${filter.value}` : ""
    }`;
  },
  getDataAgreementRecordByID: (dataAgreementRecordId: string | undefined) => {
    return `/audit/consent-record/${dataAgreementRecordId}`;
  },
  listAllApiKeys: (offsetValue: number, pageSize: number) => {
    return `/config/admin/apikeys?limit=${pageSize}&offset=${offsetValue}`;
  },
  addNewApiKey: () => {
    return "/config/admin/apikey";
  },
  deleteApiKey: (apiKeyId: string) => {
    return `/config/admin/apikey/${apiKeyId}`;
  },
  getPrivacyBoard: () => {
    return "config/privacy-dashboard";
  },
  getStatus: () => {
    return "/onboard/status";
  },
  listWebhookContentTypes: () => {
    return "/config/webhooks/payload/content-types";
  },
  addWebhooks: () => {
    return "/config/webhook";
  },
  listWebhookEventTypes: () => {
    return "/config/webhooks/event-types";
  },
  listAllWebhooks: (offsetValue: number, pageSize: number) => {
    return `/config/webhooks?limit=${pageSize}&offset=${offsetValue}`;
  },
  updateWebhookById: (webhookId: string | undefined) => {
    return `/config/webhook/${webhookId}`;
  },
  getWebhookById: (webhookId: string | undefined) => {
    return `/config/webhook/${webhookId}`;
  },
  deleteWebhook: (webhookId: string | undefined) => {
    return `/config/webhook/${webhookId}`;
  },
  getWebhooksRecentDeliveries: (webhookId: string | undefined) => {
    return `/config/webhooks/${webhookId}/deliveries`;
  },
};
