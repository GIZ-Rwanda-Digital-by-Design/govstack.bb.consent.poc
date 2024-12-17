import { Injectable } from '@nestjs/common';

export const CONSENT_API_URL = 'http://api/v2';
export const CONSENT_BB_DEVELOPER_APIKEY = process.env.CONSENT_BB_DEVELOPER_APIKEY || '';
export const NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN = process.env.NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN || 'the_agreement_id';

@Injectable()
export class AppService {
  async isConsentGiven(id: string) {
    if(!CONSENT_BB_DEVELOPER_APIKEY) {
      throw new Error("Missing CONSENT_BB_DEVELOPER_APIKEY");
    }

    if(!NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN) {
      throw new Error("Missing NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN");
    }

    const res = await fetch(
      `${CONSENT_API_URL}/service/individual/record/consent-record`,
      {
        method: 'GET',
        headers: {
          'X-ConsentBB-IndividualId': id,
          Content: 'application/json',
          Authorization: `ApiKey ${CONSENT_BB_DEVELOPER_APIKEY}`,
        },
      },
    );

    const consentsData = await res.json();

    const consents = consentsData.consentRecords;
    return consents.find(
      (x) =>
        x.dataAgreementId === NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN &&
        x.optIn === true,
    );
  }

  async getConsentIndividual(id: string) {
    const res = await fetch(`${CONSENT_API_URL}/service/individual/${id}`, {
      method: 'GET',
      headers: {
        Content: 'application/json',
        Authorization: `ApiKey ${CONSENT_BB_DEVELOPER_APIKEY}`,
      },
    });

    return (await res.json())?.individual;
  }
}
