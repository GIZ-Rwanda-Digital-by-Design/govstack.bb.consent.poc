import { useTranslation } from "react-i18next";

export interface DataAgreementsResponse {
  dataAgreements: DataAgreement[];
  pagination: Pagination;
}

export interface DataAgreement {
  id: string;
  version: string;
  controllerId: string;
  controllerUrl: string;
  controllerName: string;
  policy: Policy;
  purpose: string;
  purposeDescription: string;
  lawfulBasis: string;
  methodOfUse: any;
  dpiaDate: string;
  dpiaSummaryUrl: string;
  signature: any;
  active: boolean;
  forgettable: boolean;
  compatibleWithVersionId: string;
  lifecycle: string;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
  url: string;
  jurisdiction: string;
  industrySector: string;
  dataRetentionPeriodDays: number;
  geographicRestriction: string;
  storageLocation: string;
}

export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const getMethodOfUse = (methodOfUse: string) => {
  const { t } = useTranslation("translation");

  if (methodOfUse === "null") {
    return t("dataAgreements.none");
  } else if (methodOfUse === "data_source") {
    return t("dataAgreements.dataSource");
  } else {
    return t("dataAgreements.dataUsingService");
  }
};

export const getLawfulBasisOfProcessing = (LawfulBasisOfProcessing: string) => {
  const { t } = useTranslation("translation");

  if (LawfulBasisOfProcessing === "consent") {
    return t("dataAgreements.consent");
  } else if (LawfulBasisOfProcessing === "contract") {
    return t("dataAgreements.contract");
  } else if (LawfulBasisOfProcessing === "legal_obligation") {
    return t("dataAgreements.legalObligation");
  } else if (LawfulBasisOfProcessing === "vital_interest") {
    return t("dataAgreements.vitalInterest");
  } else if (LawfulBasisOfProcessing === "public_task") {
    return t("dataAgreements.publicTask");
  } else {
    return t("dataAgreements.legitimateInterest");
  }
};

export const getPublishValues = (lifecycle: string) => {
  const { t } = useTranslation("translation");

  if (lifecycle === "draft") {
    return t("dataAgreements.draft");
  } else {
    return t("dataAgreements.published");
  }
};
