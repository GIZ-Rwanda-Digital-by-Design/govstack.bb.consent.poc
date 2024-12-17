import { createContext } from "react";
import { Organization } from "../interfaces/Organisation";

export interface OrganizationDetailsCRUDProps {
  organisationDetails: any;
  coverImageBase64: string | undefined;
  logoImageBase64: string | undefined;
  setOrganisationDetails:React.Dispatch<React.SetStateAction<any>>;
  setCoverImageBase64: React.Dispatch<React.SetStateAction<any>>;
  setLogoImageBase64:React.Dispatch<React.SetStateAction<any>>
}

export const OrganizationDetailsCRUDContext =
  createContext<OrganizationDetailsCRUDProps>(
    {} as OrganizationDetailsCRUDProps
  );
