import { Injectable } from '@nestjs/common';

export const CONSENT_API_URL = 'http://api/v2';
export const CONSENT_BB_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTY29wZXMiOlsiY29uZmlnIiwiYXVkaXQiLCJzZXJ2aWNlIiwib25ib2FyZCJdLCJPcmdhbmlzYXRpb25JZCI6IjY3MTdmZDgwMDc1NGI0YjhhYTNkNDNlMSIsIk9yZ2FuaXNhdGlvbkFkbWluSWQiOiI2NzE3ZmQ4MDA3NTRiNGI4YWEzZDQzZGQiLCJleHAiOjE3MzUzODkyMDZ9.vyllKgmj5XK9pY1G7-nogQuHLCc-Otwa59VtBzn3kGw';

export const AGREEMENT_THAT_SHOULD_BE_OPTIN = '6759d22db02e5549afbfc938';

@Injectable()
export class AppService {
  async isConsentGiven(id: string) {
    const res = await fetch(
      `${CONSENT_API_URL}/service/individual/record/consent-record`,
      {
        method: 'GET',
        headers: {
          'X-ConsentBB-IndividualId': id,
          Content: 'application/json',
          Authorization: `ApiKey ${CONSENT_BB_TOKEN}`,
        },
      },
    );

    const consentsData = await res.json();

    const consents = consentsData.consentRecords;
    return consents.find(
      (x) =>
        x.dataAgreementId === AGREEMENT_THAT_SHOULD_BE_OPTIN &&
        x.optIn === true,
    );
  }

  async getConsentIndividual(id: string) {
    const res = await fetch(`${CONSENT_API_URL}/service/individual/${id}`, {
      method: 'GET',
      headers: {
        Content: 'application/json',
        Authorization: `ApiKey ${CONSENT_BB_TOKEN}`,
      },
    });

    return (await res.json())?.individual;
  }
}
