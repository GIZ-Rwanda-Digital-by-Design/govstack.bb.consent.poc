import i18n from "i18next";
import { formatISODateToLocalString } from "../utils/formatISODateToLocalString";

export const getOptinValues = (optIn: boolean) => {
  if (optIn === true) {
    return "Opt-in";
  } else {
    return "Opt-out";
  }
};

export const getLawfulBasisOfProcessing = (
  LawfulBasisOfProcessing: string,
  t: (key: string) => string
) => {
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

export const convertConsentRecordsForClient = (consentRecords: any) => {
  const consentRecordsConvertedDataForClientPurpose =
    consentRecords.consentRecords.map((consentRecords: any, index: number) => {
      const { id, optIn, timestamp, dataAgreement, ...otherProps } =
        consentRecords;
      return {
        id: index,
        consentRecordId: id,
        optIn: getOptinValues(optIn),
        timestamp: formatISODateToLocalString(timestamp),
        dataAgreement: {
          lawfulBasis: getLawfulBasisOfProcessing(
            dataAgreement.lawfulBasis,
            i18n.t
          ),
          purpose: dataAgreement.purpose,
          version: dataAgreement.version,
        },
        ...otherProps,
      };
    });
  const convertedConsentRecords = {
    consentRecords: consentRecordsConvertedDataForClientPurpose,
    pagination: consentRecords.pagination,
  };

  return convertedConsentRecords;
};

export const convertViewLogsForClient = (viewLogs: any) => {
  const viewLogsConvertedDataForClientPurpose = viewLogs.logs.map(
    (viewLogs: any) => {
      const { timestamp, ...otherProps } = viewLogs;
      return {
        timestamp: formatISODateToLocalString(timestamp),
        ...otherProps,
      };
    }
  );
  const convertedViewLogs = {
    logs: viewLogsConvertedDataForClientPurpose,
    pagination: viewLogs.pagination,
  };

  return convertedViewLogs;
};
