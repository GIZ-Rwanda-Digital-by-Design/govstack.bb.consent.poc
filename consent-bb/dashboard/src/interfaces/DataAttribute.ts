export interface DataAttributeInterface {
  ID: string;
  Consent: string;
  Description: string;
  PurposeIDs: string[];
}

export interface DataAttributeInterface {
  dataAttribute: DataAttribute;
  revisions: any[];
  pagination: any;
}

export interface DataAttribute {
  id: string;
  version: string;
  agreementIds: string[];
  name: string;
  description: string;
  sensitivity: boolean;
  category: string;
}

export interface DataAttributepayloadInterface {
  dataAttribute: DataAttribute;
}

export interface DataAttribute {
  id: string;
  version: string;
  agreementIds: string[];
  name: string;
  description: string;
  sensitivity: boolean;
  category: string;
}
