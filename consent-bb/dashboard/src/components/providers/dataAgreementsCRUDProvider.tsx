import React, { FC, useEffect, useState } from "react";
import { DataAgreementsCRUDContext } from "../../contexts/dataAgreementCrud";
import { DataAttributeInterface } from "../../interfaces/DataAttribute";
import { HttpService } from "../../service/HTTPService";

// DataAgreementsCRUDProviderProps
interface DataAgreementsCRUDProviderProps {
  children: React.ReactNode;
}

export const DataAgreementsCRUDProvider: FC<
  DataAgreementsCRUDProviderProps
> = ({ children }) => {
  // Existing data attributes
  const [existingDataAttributes, setExistingDataAttributes] = useState<
    any
  >([]);

  useEffect(() => {
    HttpService.listDataAttributes(0 , 100, '')
      .then((dataAttributes: any) => {
        setExistingDataAttributes(dataAttributes.dataAttributes);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <DataAgreementsCRUDContext.Provider
      value={{
        existingDataAttributes,
        setExistingDataAttributes,
      }}
    >
      {children}
    </DataAgreementsCRUDContext.Provider>
  );
};
