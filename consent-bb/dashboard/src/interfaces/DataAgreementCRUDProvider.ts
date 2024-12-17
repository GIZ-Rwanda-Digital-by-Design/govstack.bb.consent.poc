// DADetails
export interface DADetails {
    usagePurpose: string;
    usagePurposeDescription: string;
    version: string;
    methodOfUse: number;
    lawfulBasisOfProcessing: number;
    policyURL: string;
    jurisdiction: string;
    industryScope: string;
    storageLocation: string;
    dataRetentionPeriodDays: number;
    restriction: string;
    Shared3PP: boolean;
    dpiaDate: string;
    dpiaSummaryURL: string;
}

export interface DataAttributeToBeCreated {
    Consent: string;
    ID: string;
    Description: string;
    existingPurposeIDs: string[]
}