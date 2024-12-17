import { combineDataProviders } from "react-admin";
import { HttpService } from "../../service/HTTPService";
import { offSet } from "../../utils/paginateFunction";

const dataAgreementDataProvider = {
  getList: (resource: any, params: any) => {
    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;
    let offsetValue = offSet(pageNumber, pageSize);
    const filter = params.filter.status

    return HttpService.listDataAgreements(offsetValue, pageSize, filter, "", true)
      .then((dataAgreements) => {
        return {
          data: dataAgreements.dataAgreements,
          total: dataAgreements.pagination.totalItems,
          hasNextPage: dataAgreements.pagination.hasNext,
          hasPreviousPage: dataAgreements.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

const personalDataDataProvider = {
  getList: (resource: any, params: any) => {
    const filter = params.filter.status
    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;

    let offsetValue = offSet(pageNumber, pageSize);
    return HttpService.listDataAttributes(offsetValue, pageSize, filter)
      .then((dataAttributes) => {
        return {
          data: dataAttributes.dataAttributes,
          total: dataAttributes.pagination.totalItems,
          hasNextPage: dataAttributes.pagination.hasNext,
          hasPreviousPage: dataAttributes.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

const userRecordsDataProvider = {
  getList: (resource: any, params: any) => {
    const filter = params.filter.status

    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;

    let offsetValue = offSet(pageNumber, pageSize);
    return HttpService.listAllDataAgreementRecords(
      offsetValue,
      pageSize,
      filter
    )
      .then((dataAgreementRecords) => {
        return {
          data: dataAgreementRecords.consentRecords,
          total: dataAgreementRecords.pagination.totalItems,
          hasNextPage: dataAgreementRecords.pagination.hasNext,
          hasPreviousPage: dataAgreementRecords.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

const viewLogsProvider = {
  getList: (resource: any, params: any) => {
    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;
    const filter = params.filter.status

    let offsetValue = offSet(pageNumber, pageSize);
    return HttpService.listAllAdminLogs(offsetValue, pageSize, filter)
      .then((allLogs) => {
        return {
          data: allLogs.logs,
          total: allLogs.pagination.totalItems,
          hasNextPage: allLogs.pagination.hasNext,
          hasPreviousPage: allLogs.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

const developerAPIProvider = {
  getList: (resource: any, params: any) => {
    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;

    let offsetValue = offSet(pageNumber, pageSize);
    return HttpService.listAllApiKeys(offsetValue, pageSize)
      .then((apis) => {
        return {
          data: apis.apiKeys,
          total: apis.pagination.totalItems,
          hasNextPage: apis.pagination.hasNext,
          hasPreviousPage: apis.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

const webhooksProvider = {
  getList: (resource: any, params: any) => {
    let pageSize = params.pagination.perPage;
    let pageNumber = params.pagination.page;

    let offsetValue = offSet(pageNumber, pageSize);
    return HttpService.listAllWebhooks(offsetValue, pageSize)
      .then((webhooks) => {
        return {
          data: webhooks.webhooks,
          total: webhooks.pagination.totalItems,
          hasNextPage: webhooks.pagination.hasNext,
          hasPreviousPage: webhooks.pagination.hasPrevious,
        };
      })
      .catch((error) => {});
  },
};

export const dataProvider = combineDataProviders((resource): any => {
  switch (resource) {
    case "dataagreement":
      return dataAgreementDataProvider;
    case "personaldata":
      return personalDataDataProvider;
    case "viewlogs":
      return viewLogsProvider;
    case "consentrecords":
      return userRecordsDataProvider;
    case "developerapi":
      return developerAPIProvider;
    case "webhooks":
      return webhooksProvider;
  }
});
