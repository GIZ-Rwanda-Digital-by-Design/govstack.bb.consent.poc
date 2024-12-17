import { useContext, useState, Fragment } from "react";

import { Box, Typography } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import RestrictionModal from "../modals/restrictionModal";
import {
  DataAgreementsCRUDContext,
  DataAgreementsCRUDContextValue,
} from "../../contexts/dataAgreementCrud";
import { DataAttribute } from "./DataAttribute";
import { useTranslation } from "react-i18next";

interface Props {
  mode: string;
  subtext?: string;
  append?: any;
  fields?: any;
  remove?: any;
  formController?: any;
}

const DataAgreementPersonalDataTable = (props: Props) => {
  const { t } = useTranslation("translation");
  const { mode, subtext, append, fields, remove, formController } = props;
  const { existingDataAttributes } = useContext<DataAgreementsCRUDContextValue>(
    DataAgreementsCRUDContext
  );

  const [openRestrictionModal, setOpenRestrictionModal] = useState(false);

  const addDataAttributeField = () => {
    append({ attributeName: "", attributeDescription: "" });
  };

  return (
    <Box style={{ marginBottom: "4rem" }}>
      <Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography variant="subtitle1">
            {t("dataAgreements.dataAttributes")}
            <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
          </Typography>
          <AddCircleOutlineOutlinedIcon
            type="submit"
            onClick={mode === "Read" ? () => {} : () => addDataAttributeField()}
            style={{
              cursor: mode === "Read" ? "not-allowed" : "pointer",
              marginLeft: "5px",
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "-7px", marginBottom: "10px" }}
        >
          {subtext}
        </Typography>
      </Box>
      {fields?.map((item: any, index: number) => {
        return (
          <Fragment key={item.id}>
            <DataAttribute
              index={index}
              mode={mode}
              existingDataAttributes={existingDataAttributes}
              remove={remove}
              formController={formController}
            />
          </Fragment>
        );
      })}
      <RestrictionModal
        open={openRestrictionModal}
        setOpen={setOpenRestrictionModal}
        mode={mode}
      />
    </Box>
  );
};

export default DataAgreementPersonalDataTable;
