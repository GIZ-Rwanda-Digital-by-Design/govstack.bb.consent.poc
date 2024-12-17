import { Fragment } from "react";

import { Box, Typography } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useTranslation } from "react-i18next";
import { DataSourcesTable } from "./DataSourcesTable";

interface Props {
  mode: string;
  appendDataAttributes: any;
  fieldsDataAttributes: any;
  removeDataAttributes: any;
  formController: any;
  methods: any;
}

const DataSourcesTableContainer = (props: Props) => {
  const { t } = useTranslation("translation");
  const {
    mode,
    appendDataAttributes,
    fieldsDataAttributes,
    removeDataAttributes,
    formController,
    methods,
  } = props;

  const addDataAttributeField = () => {
    appendDataAttributes({
      name: "",
      sector: "",
      location: "",
      privacyDashboardUrl: "",
    });
  };

  return (
    <>
      <Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography variant="subtitle1">
            {t("dataAgreements.dataSources")}
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
        <Typography variant="body2" style={{ marginBottom: "15px" }}>
          {t("dataAgreements.dataSourceSubText")}
        </Typography>
      </Box>
      {fieldsDataAttributes?.map((item: any, index: number) => {
        return (
          <Fragment key={item.id}>
            <DataSourcesTable
              index={index}
              mode={mode}
              formController={formController}
              addDataAttributeField={addDataAttributeField}
              methods={methods}
              fieldsDataAttributes={fieldsDataAttributes}
              removeDataAttributes={removeDataAttributes}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default DataSourcesTableContainer;
