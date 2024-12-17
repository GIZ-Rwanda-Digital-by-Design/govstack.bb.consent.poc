import { createContext } from 'react';
import { DataAttributeInterface } from '../interfaces/DataAttribute';

export interface DataAgreementsCRUDContextValue {
    existingDataAttributes: DataAttributeInterface[];
    setExistingDataAttributes: React.Dispatch<React.SetStateAction<DataAttributeInterface[]>>;
}

export const DataAgreementsCRUDContext = createContext<DataAgreementsCRUDContextValue>({} as DataAgreementsCRUDContextValue);
