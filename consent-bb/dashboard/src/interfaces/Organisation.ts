export interface Organization {
  ID: string;
  Name: string;
  CoverImageID: string;
  CoverImageURL: string;
  LogoImageID: string;
  LogoImageURL: string;
  Location: string;
  Type: any;
  Jurisdiction: string;
  Disclosure: string;
  Restriction: string;
  Shared3PP: boolean;
  Description: string;
  Enabled: boolean;
  PolicyURL: string;
  EulaURL: string;
  Templates: any[];
  Purposes: any[];
  Admins: any;
  Subs: any;
  HlcSupport: boolean;
  DataRetention: any;
  IdentityProviderRepresentation: any;
  KeycloakOpenIDClient: any;
  ExternalIdentityProviderAvailable: boolean;
}
